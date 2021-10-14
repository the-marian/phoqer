from datetime import datetime
from enum import Enum
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
    pub_date: datetime
    viewed: bool
