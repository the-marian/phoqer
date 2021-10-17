from typing import Optional

from fastapi import APIRouter, Depends

from FastAPI.notifications.crud import get_notifications
from FastAPI.notifications.schemas import NotificationReply
from FastAPI.utils import get_current_user_or_none

router = APIRouter(
    prefix="/notifications",
    tags=["notifications"],
)


@router.get("", response_model=NotificationReply)
async def get_notification(user_id: Optional[int] = Depends(get_current_user_or_none)):
    return await get_notifications(user_id=user_id)
