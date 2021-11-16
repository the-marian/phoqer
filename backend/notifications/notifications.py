from math import ceil
from typing import Dict

from fastapi import APIRouter, Depends, HTTPException, Response

from config import NOTIFICATION_SIZE
from notifications import crud
from notifications.schemas import NotificationsListResponse
from utils import get_current_user

router = APIRouter(
    prefix="/notifications",
    tags=["notifications"],
)


@router.get("", response_model=NotificationsListResponse)
async def get_notification(
    page: int = 1, user_id: int = Depends(get_current_user)
) -> Dict:
    offset = (page - 1) * NOTIFICATION_SIZE
    limit = NOTIFICATION_SIZE
    return {
        "total": ceil(await crud.count_notifications(user_id) / NOTIFICATION_SIZE),
        "data": await crud.get_notifications(
            user_id,
            limit=limit,
            offset=offset,
        ),
    }


@router.delete("/{notification_id}", status_code=204)
async def delete_comment(
    notification_id: int, author_id: int = Depends(get_current_user)
) -> Response:
    notification = await crud.get_notification(notification_id)
    if not notification:
        raise HTTPException(
            status_code=404,
            detail=f"Notification with id {notification_id} does not exist",
        )

    if notification and author_id != notification["recipient_id"]:
        raise HTTPException(
            status_code=403,
            detail="The user does not have permission to delete this notification",
        )
    await crud.delete_notification(notification_id)
    return Response(status_code=204)
