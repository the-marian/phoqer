from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, HttpUrl


class ChatStatus(Enum):
    APPROVED = "APPROVED"
    ARCHIVED = "ARCHIVED"
    NEW = "NEW"


class MessageType(Enum):
    MESSAGE = "MESSAGE"
    RENT_REQUEST = "RENT_REQUEST"
    RETURN_REQUEST = "RETURN_REQUEST"


class ChatsListItem(BaseModel):
    chat_id: int
    cover_image: Optional[str] = None
    new_messages: int = 0
    recipient_first_name: str
    recipient_id: int
    recipient_last_activity: datetime
    recipient_last_name: str
    status: ChatStatus
    title: str


class ChatsListResponse(BaseModel):
    total: int = 0
    data: List[ChatsListItem]


class MessagesListItem(BaseModel):
    creation_datetime: datetime
    first_name: str
    id: int
    is_red: bool
    last_name: str
    message_type: MessageType
    profile_img: Optional[str] = None
    text: str
    uploads: List[HttpUrl] = []
    user_id: int


class MessagesListResponse(BaseModel):
    total: int = 0
    data: List[MessagesListItem]


class CreateChatResponse(BaseModel):
    id: int
