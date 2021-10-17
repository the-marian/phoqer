from datetime import datetime
from enum import Enum
from uuid import UUID

from pydantic import BaseModel


class NotificationType(Enum):
    RENT_START = "RENT_START"
    RENT_END = "RENT_END"
    RENT_REQUEST = "RENT_REQUEST"
    RETURN_ITEM_REQUEST = "RETURN_ITEM_REQUEST"


class NotificationReply(BaseModel):
    id: int
    notification_type: NotificationType
    body: str
    offer_id: UUID
    pub_date: datetime
    recipient_id: int
    viewed: bool
