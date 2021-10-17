from typing import Optional

from fastapi import APIRouter, Depends

from FastAPI.notifications import crud
from FastAPI.notifications.schemas import NotificationsListResponse
from FastAPI.config import NOTIFICATION_SIZE
from FastAPI.utils import get_current_user_or_none
from math import ceil

router = APIRouter(
    prefix="/notifications",
    tags=["notifications"],
)


@router.get("", response_model=NotificationsListResponse)
async def get_notification(
    page: int = 1,
    user_id: Optional[int] = Depends(get_current_user_or_none)
):
    offset = (page - 1) * NOTIFICATION_SIZE
    limit = NOTIFICATION_SIZE
    return {
        "total": ceil(await crud.count_notifications(user_id) / NOTIFICATION_SIZE),
        "data": await crud.get_notifications(
            user_id,
            limit=limit,
            offset=offset,
        )
    }