from typing import Optional, List

from datetime import datetime
from pydantic import BaseModel, HttpUrl


class PaginationResponse(BaseModel):
    total: int = 0
    data: List


class ChatsList(BaseModel):
    chat_id: int
    recipient_id: int
    recipient_first_name: str
    recipient_last_name: str
    recipient_last_activity: datetime
    new_messages: int = 0
    cover_image: Optional[str] = None


class MessagesList(BaseModel):
    id: int
    text: str
    creation_datetime: datetime
    is_red: bool
    users_user: int
    first_name: str
    last_name: str
    profile_img: Optional[str] = None
    uploads: List[HttpUrl] = []


MessagesList.update_forward_refs()


class ChatsListResponse(PaginationResponse):
    data: List[ChatsList]


class MessagesListResponse(PaginationResponse):
    data: List[MessagesList]
