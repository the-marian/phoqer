from datetime import datetime
from enum import Enum
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, HttpUrl


class NotificationType(Enum):
    NEW_COMMENT = "NEW_COMMENT"
    RENT_CANCELLED = "RENT_CANCELLED"
    RENT_CONFIRMED = "RENT_CONFIRMED"
    RENT_END = "RENT_END"
    RENT_REQUEST = "RENT_REQUEST"


class NotificationsList(BaseModel):
    id: int
    notification_type: NotificationType
    offer_title: str
    offer_id: UUID
    pub_date: datetime
    recipient_id: int
    recipient_first_name: str
    recipient_last_name: str
    recipient_avatar: Optional[HttpUrl] = None
    viewed: bool


class NotificationsListResponse(BaseModel):
    total: int = 0
    data: List[NotificationsList]
