from typing import List, Mapping, Optional

from config import NOTIFICATION_SIZE, database


async def get_notifications(
    user_id: int, offset: int = 0, limit: int = NOTIFICATION_SIZE
) -> List[Mapping]:
    query = """
    SELECT
        notifications.id,
        notifications.notification_type,
        notifications.body,
        notifications.offer_id,
        notifications.pub_date,
        notifications.recipient_id,
        notifications.viewed,
        offers_offer.title,
        users_user.first_name,
        users_user.last_name,
        users_user.profile_img
    FROM notifications
    INNER JOIN offers_offer ON notifications.offer_id=offers_offer.id
    INNER JOIN users_user ON notifications.recipient_id=users_user.id
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


async def get_notification(user_id: int) -> Optional[Mapping]:
    query = """
    SELECT
        id,
        notification_type,
        body,
        offer_id,
        pub_date,
        recipient_id,
        viewed
    FROM notifications
    WHERE recipient_id=:user_id
    """
    return await database.fetch_one(query=query, values={"user_id": user_id})


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
