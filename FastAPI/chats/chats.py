from fastapi import APIRouter, Depends, HTTPException
from math import ceil
from typing import Dict, Optional, List

from FastAPI.chats import crud
from FastAPI.chats.schemas import ChatsListResponse, ChatsListItem, MessagesListResponse, MessagesListItem
from FastAPI.config import CHAT_SIZE, MESSAGES_SIZE
from FastAPI.utils import get_current_user

router = APIRouter(
    prefix="/chats",
    tags=["chats"],
)


@router.get("", response_model=ChatsListResponse)
async def get_chats(
        user_id=Depends(get_current_user),
        page: int = 1,
        search: Optional[str] = None,
) -> Dict[str, List[ChatsListItem]]:
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
        user_id=Depends(get_current_user),
) -> Dict[str, List[MessagesListItem]]:
    offset = (page - 1) * MESSAGES_SIZE
    limit = MESSAGES_SIZE

    chat = await crud.is_chat_exist(chat_id)
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

    uploads = await crud.get_chat_uploads(chat_id)
    messages = await crud.get_messages(chat_id, offset, limit)

    return {
        "total": ceil(await crud.count_messages(chat_id) / MESSAGES_SIZE),
        "data": [MessagesListItem(**message, uploads=uploads.get(message["id"], [])) for message in messages],
    }
