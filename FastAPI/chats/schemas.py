from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, HttpUrl


class ChatsListItem(BaseModel):
    chat_id: int
    title: str
    recipient_id: int
    recipient_first_name: str
    recipient_last_name: str
    recipient_last_activity: datetime
    new_messages: int = 0
    cover_image: Optional[str] = None


class ChatsListResponse(BaseModel):
    total: int = 0
    data: List[ChatsListItem]


class MessagesListItem(BaseModel):
    id: int
    text: str
    creation_datetime: datetime
    is_red: bool
    user_id: int
    first_name: str
    last_name: str
    profile_img: Optional[str] = None
    uploads: List[HttpUrl] = []


class MessagesListResponse(BaseModel):
    total: int = 0
    data: List[MessagesListItem]
