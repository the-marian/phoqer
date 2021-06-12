import json
from math import ceil
from typing import Any, Dict, List, Mapping, Optional, Union

from cryptography.fernet import Fernet
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    WebSocket,
    WebSocketDisconnect,
)
from FastAPI.chats import crud
from FastAPI.chats.schemas import (
    ChatsListResponse,
    MessagesListItem,
    MessagesListResponse,
)
from FastAPI.config import CHAT_SIZE, FERNET_SECRET_KEY, MESSAGES_SIZE
from FastAPI.utils import decode_jwt, get_current_user

router = APIRouter(
    prefix="/chats",
    tags=["chats"],
)


class ConnectionManager:
    def __init__(self) -> None:
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: int) -> None:
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, client_id: int) -> None:
        self.active_connections.pop(client_id)

    async def send_msg(self, message: dict, user_id: int) -> None:
        if connection := self.active_connections.get(user_id):
            data = json.dumps(message, default=str)
            await connection.send_text(data)


manager = ConnectionManager()


@router.websocket("/chat/{chat_id}")
async def chat_endpoint(
    websocket: WebSocket,
    chat_id: int,
    token: str = Query(None),
) -> None:
    f = Fernet(FERNET_SECRET_KEY)
    user_id = decode_jwt(token)["user_id"]
    if not (chat_data := await crud.is_chat_exist(chat_id=chat_id)):
        raise Exception(f"Chat with id {chat_id} does not exist")
    client_id, author_id = chat_data["client_id"], chat_data["author_id"]
    if user_id not in (client_id, author_id):
        raise Exception("The user does not have access to this chat")
    await manager.connect(websocket, user_id=user_id)
    try:
        while True:
            message_data = await websocket.receive_json()
            message_text = message_data["text"]
            encoded_message = message_text.encode()
            encrypted_message = f.encrypt(encoded_message).decode()
            message_id = await crud.create_message(
                message=encrypted_message, chat_id=chat_id, user_id=user_id
            )
            if message := await crud.get_message(message_id):
                message = dict(message)
                message["text"] = f.decrypt(message["text"].encode()).decode()
            else:
                raise Exception("Message does not created")
            await manager.send_msg(message=message, user_id=client_id)
            await manager.send_msg(message=message, user_id=author_id)
    except WebSocketDisconnect:
        manager.disconnect(client_id=user_id)


@router.get("", response_model=ChatsListResponse)
async def get_chats(
    user_id: int = Depends(get_current_user),
    page: int = 1,
    search: Optional[str] = None,
) -> Dict[str, Union[int, List[Mapping[str, Any]]]]:
    offset = (page - 1) * CHAT_SIZE
    limit = CHAT_SIZE

    return {
        "total": ceil(await crud.count_chats(user_id, search) / CHAT_SIZE),
        "data": await crud.get_chats(user_id, offset, limit, search),
    }


@router.get("/{chat_id}", response_model=MessagesListResponse)
async def get_messages(
    chat_id: int,
    page: int = 1,
    user_id: int = Depends(get_current_user),
) -> Dict[str, Union[int, List[MessagesListItem]]]:
    offset = (page - 1) * MESSAGES_SIZE
    limit = MESSAGES_SIZE

    if not (chat := await crud.is_chat_exist(chat_id)):
        raise HTTPException(
            status_code=404,
            detail=f"Chat with id {chat_id} does not exist",
        )

    if user_id not in (chat.get("author_id"), chat.get("client_id")):
        raise HTTPException(
            status_code=403,
            detail="The user does not have access to this chat",
        )

    uploads = await crud.get_chat_uploads(chat_id)
    messages = await crud.get_messages(chat_id, offset, limit)

    return {
        "total": ceil(await crud.count_messages(chat_id) / MESSAGES_SIZE),
        "data": [
            MessagesListItem(**message, uploads=uploads.get(message["id"], []))
            for message in messages
        ],
    }
