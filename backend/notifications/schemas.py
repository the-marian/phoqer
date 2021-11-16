from datetime import datetime
from enum import Enum
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, HttpUrl


class NotificationType(Enum):
    NEW_COMMENT = 'NEW_COMMENT',
    RENT_CANCELLED = 'RENT_CANCELLED',
    RENT_CONFIRMED = 'RENT_CONFIRMED',
    RENT_END = "RENT_END"
    RENT_REQUEST = "RENT_REQUEST"


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
