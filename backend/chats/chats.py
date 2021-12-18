import json
from math import ceil
from typing import Any, Dict, List, Mapping, Optional, Union

from cryptography.fernet import Fernet
from fastapi import APIRouter, Body, Depends, HTTPException, Query, Response
from fastapi.websockets import WebSocket, WebSocketDisconnect

from chats import crud
from chats.schemas import (
    ChatsListResponse,
    ChatStatus,
    CreateChatResponse,
    MessagesListItem,
    MessagesListResponse,
    MessageType,
    ShortChatInfo,
)
from config import CHAT_SIZE, FERNET_SECRET_KEY, MESSAGES_SIZE, TECH_RENT_REQUEST
from notifications.crud import create_notification
from notifications.schemas import NotificationType
from offers.crud import get_offer
from utils import decode_jwt, get_current_user

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
    if not (chat_data := await crud.get_chat(chat_id=chat_id)):
        raise Exception(f"Chat with id {chat_id} does not exist")
    client_id, author_id = chat_data["client_id"], chat_data["author_id"]
    if user_id not in (client_id, author_id):
        raise Exception("The user does not have access to this chat")
    await manager.connect(websocket, user_id=user_id)
    try:
        while True:
            message_data = await websocket.receive_json()
            message_text = message_data["text"]
            message_uploads = message_data.get("uploads")
            encoded_message = message_text.encode()
            encrypted_message = f.encrypt(encoded_message).decode()
            message_id = await crud.create_message(
                access_urls=message_uploads,
                chat_id=chat_id,
                message=encrypted_message,
                message_type=MessageType.MESSAGE.value,
                user_id=user_id,
            )
            if message := await crud.get_message(message_id):
                message = dict(message)
                message["text"] = f.decrypt(message["text"].encode()).decode()
                message["uploads"] = message_uploads
            else:
                raise Exception("Message does not created")
            await manager.send_msg(message=message, user_id=client_id)
            await manager.send_msg(message=message, user_id=author_id)
    except WebSocketDisconnect:
        manager.disconnect(client_id=user_id)


@router.get("", response_model=ChatsListResponse)
async def get_chats(
    i_am_author: Optional[bool] = None,
    i_am_client: Optional[bool] = None,
    is_done: Optional[bool] = None,
    page: int = 1,
    search: Optional[str] = None,
    user_id: int = Depends(get_current_user),
) -> Dict[str, Union[int, List[Mapping[str, Any]]]]:
    offset = (page - 1) * CHAT_SIZE
    limit = CHAT_SIZE
    return {
        "total": ceil(
            await crud.count_chats(
                user_id=user_id,
                search=search,
                i_am_author=i_am_author,
                i_am_client=i_am_client,
                is_done=is_done,
            )
            / CHAT_SIZE
        ),
        "data": await crud.get_chats(
            i_am_author=i_am_author,
            i_am_client=i_am_client,
            is_done=is_done,
            limit=limit,
            offset=offset,
            search=search,
            user_id=user_id,
        ),
    }


@router.post("", status_code=201, response_model=CreateChatResponse)
async def create_chat(
    offer_id: str = Body(..., embed=True), user_id: int = Depends(get_current_user)
) -> Dict[str, int]:
    if not (offer := await get_offer(offer_id)):
        raise HTTPException(
            status_code=404,
            detail=f"Offer with id: {offer_id} does not exist",
        )
    author_id = offer["author_id"]
    chat_id = await crud.create_chat(
        offer_id=offer_id, user_id=user_id, author_id=author_id
    )
    await crud.create_message(
        access_urls=[],
        chat_id=chat_id,
        message=TECH_RENT_REQUEST,
        message_type=MessageType.RENT_REQUEST.value,
        user_id=author_id,
    )
    await create_notification(
        notification_type=NotificationType.RENT_REQUEST,
        recipient_id=author_id,
        initiator_id=user_id,
        offer_id=offer_id,
    )
    return {"id": chat_id}


@router.get("/{chat_id}/messages", response_model=MessagesListResponse)
async def get_messages(
    chat_id: int,
    page: int = 1,
    user_id: int = Depends(get_current_user),
) -> Dict[str, Union[int, List[MessagesListItem]]]:
    offset = (page - 1) * MESSAGES_SIZE
    limit = MESSAGES_SIZE

    if not (chat := await crud.get_chat(chat_id)):
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
    unread_messages_ids = [
        message["id"]
        for message in messages
        if message["is_read"] is False
    ]
    await crud.read_messages(unread_messages_ids)
    f = Fernet(FERNET_SECRET_KEY)
    return {
        "total": ceil(await crud.count_messages(chat_id) / MESSAGES_SIZE),
        "data": [
            MessagesListItem(
                **message,
                text=f.decrypt(message["encrypted_text"].encode()).decode(),
                uploads=uploads.get(message["id"], []),
            )
            for message in messages
        ],
    }


@router.get("/{chat_id}", response_model=ShortChatInfo)
async def get_chat(
    chat_id: int,
    user_id: int = Depends(get_current_user),
) -> Mapping:
    chat = await crud.get_chat(chat_id)
    if not chat:
        raise HTTPException(
            status_code=404,
            detail=f"Chat with id {chat_id} does not exist",
        )
    elif user_id not in (chat.get("author_id"), chat.get("client_id")):
        raise HTTPException(
            status_code=403,
            detail="The user does not have access to this chat",
        )
    return chat


@router.delete("/{chat_id}", status_code=204)
async def delete_chat(chat_id: int, user_id: int = Depends(get_current_user)) -> Response:
    chat = await crud.get_chat(chat_id)
    if not chat:
        raise HTTPException(
            status_code=404,
            detail=f"Chat with id {chat_id} does not exist",
        )
    if user_id not in (chat.get("author_id"), chat.get("client_id")):
        raise HTTPException(
            status_code=403,
            detail="The user does not have access to this chat",
        )
    await crud.delete_chat(chat_id)
    if user_id == chat["author_id"]:
        await create_notification(
            notification_type=NotificationType.RENT_CANCELLED,
            recipient_id=chat["client_id"],
            initiator_id=chat["client_id"],
            offer_id=chat["offer_id"],
        )
    return Response(status_code=204)


@router.patch("/{chat_id}", status_code=201)
async def update_chat_status(
    chat_id: int,
    status: ChatStatus = Body(..., embed=True),
    user_id: int = Depends(get_current_user),
) -> Response:
    chat_data = await crud.get_chat(chat_id)
    if chat_data:
        chat_status = ChatStatus(chat_data["status"])
    else:
        raise HTTPException(
            status_code=404,
            detail=f"Chat with id {chat_id} does not exist",
        )
    valid_statuses_for_status = {
        ChatStatus.NEW: (ChatStatus.APPROVED,),
        ChatStatus.APPROVED: (ChatStatus.ARCHIVED,),
        ChatStatus.ARCHIVED: (),
    }
    if status in valid_statuses_for_status[chat_status]:
        await crud.update_status(chat_id, status)
        return Response(status_code=204)
    else:
        return Response(
            status_code=403,
            content=f"Allowed statuses {valid_statuses_for_status[status]}",
        )
