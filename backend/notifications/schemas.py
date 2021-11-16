from datetime import datetime
from enum import Enum
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, HttpUrl


class NotificationType(Enum):
    RENT_START = "RENT_START"
    RENT_END = "RENT_END"
    RENT_REQUEST = "RENT_REQUEST"
    RETURN_ITEM_REQUEST = "RETURN_ITEM_REQUEST"
    RENT_REQUEST_REJECTED = "RENT_REQUEST_REJECTED"


class NotificationsList(BaseModel):
    id: int
    notification_type: NotificationType
    title: str
    body: str
    offer_id: UUID
    pub_date: datetime
    recipient_id: int
    first_name: str
    last_name: str
    profile_img: Optional[HttpUrl] = None
    viewed: bool


class NotificationsListResponse(BaseModel):
    total: int = 0
    data: List[NotificationsList]
