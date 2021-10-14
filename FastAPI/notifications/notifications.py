from fastapi import APIRouter, Depends
from FastAPI.notifications.schemas import NotificationReply
from FastAPI.utils import get_current_user, get_current_user_or_none
from typing import Dict, List, Optional
from FastAPI.notifications.crud import get_notifications


router = APIRouter(
    prefix="/notifications",
    tags=["notifications"],
)


@router.get("/notifications", response_model=NotificationReply)
def get_notifications(user_id: Optional[int] = Depends(get_current_user_or_none)):
    return get_notifications(user_id=user_id)
