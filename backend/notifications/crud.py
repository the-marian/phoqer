import datetime
from typing import List, Mapping, Optional

from config import NOTIFICATION_SIZE, database
from notifications.schemas import NotificationType


async def get_notifications(
    user_id: int, offset: int = 0, limit: int = NOTIFICATION_SIZE
) -> List[Mapping]:
    query = """
    SELECT
        notifications.id,
        notifications.notification_type,
        notifications.offer_id,
        notifications.pub_date,
        notifications.recipient_id,
        notifications.viewed,
        offers_offer.title AS offer_title,
        offers_offer.author_id AS author_id,
        users_user.first_name AS recipient_first_name,
        users_user.last_name AS recipient_last_name,
        users_user.profile_img AS recipient_avatar
    FROM notifications
    INNER JOIN offers_offer ON notifications.offer_id=offers_offer.id
    INNER JOIN users_user ON author_id=users_user.id
    WHERE recipient_id=:user_id
    ORDER BY pub_date DESC
    LIMIT :limit
    OFFSET :offset
    """
    values = {
        "user_id": user_id,
        "limit": limit,
        "offset": offset,
    }
    return await database.fetch_all(query=query, values=values)


async def get_notification(notification_id: int) -> Optional[Mapping]:
    query = """
    SELECT
        id,
        notification_type,
        offer_id,
        pub_date,
        recipient_id,
        viewed
    FROM notifications
    WHERE id=:notification_id
    """
    return await database.fetch_one(
        query=query, values={"notification_id": notification_id}
    )


async def count_notifications(user_id: int) -> int:
    query = """
    SELECT COUNT(*)
    FROM notifications
    WHERE recipient_id=:user_id
    """
    count = await database.fetch_one(query=query, values={"user_id": user_id})
    return int(count["count"]) if count else 0


async def delete_notification(notification_id: int) -> None:
    query = "DELETE FROM notifications WHERE id=:id"
    await database.execute(query=query, values={"id": notification_id})


async def create_notification(
    notification_type: NotificationType,
    recipient_id: int,
    offer_id: Optional[str] = None,
) -> None:
    query = """
    INSERT INTO notifications (
        notification_type,
        offer_id,
        pub_date,
        recipient_id,
        viewed)
    VALUES (
        :notification_type,
        :offer_id,
        :pub_date,
        :recipient_id,
        :viewed)
    """
    values = {
        "notification_type": notification_type.value,
        "offer_id": offer_id,
        "pub_date": datetime.datetime.now(),
        "recipient_id": recipient_id,
        "viewed": False,
    }
    await database.execute(query=query, values=values)


async def read_notifications(notification_ids: List[int]) -> None:
    query = "UPDATE notifications SET viewed=TRUE WHERE id = any(:notification_ids)"
    await database.execute(query=query, values={"notification_ids": notification_ids})
