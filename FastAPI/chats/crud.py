from typing import List, Optional, Mapping, Dict

from FastAPI.config import database, CHAT_SIZE, MESSAGES_SIZE
from FastAPI.chats.schemas import ChatsList


async def get_chats(
        user_id: int,
        offset: int = 0,
        limit: int = CHAT_SIZE,
        search: Optional[str] = None,
) -> List[ChatsList]:
    query = """
    SELECT
        chats.chat_id,
        offers_offer.cover_image,
        offers_offer.title,
        (SELECT COUNT(*)
            FROM messages
            WHERE messages.chat_id = chats.chat_id 
                AND messages.is_red = FALSE) AS new_messages,
        users_user.id AS recipient_id,
        users_user.first_name AS recipient_first_name,
        users_user.last_name AS recipient_last_name,
        users_user.last_login AS recipient_last_activity
    FROM chats 
    INNER JOIN offers_offer ON chats.offer_id=offers_offer.id
    INNER JOIN users_user ON 
        ((chats.author_id = :user_id AND users_user.id = chats.client_id) 
            OR (chats.client_id = :user_id AND users_user.id = chats.author_id))
        AND (((:search)::varchar IS NULL OR users_user.first_name ilike :search)
            OR ((:search)::varchar IS NULL OR users_user.last_name ilike :search))
    WHERE 
        chats.author_id = :user_id OR chats.client_id = :user_id 
        AND chats.is_done=FALSE
    LIMIT :limit
    OFFSET :offset
    """
    values = {
        "user_id": user_id,
        "offset": offset,
        "limit": limit,
        "search": search
    }
    return await database.fetch_all(query=query, values=values)


async def count_chats(
        user_id: int,
        search: Optional[str] = None,
) -> int:
    query = """
    SELECT COUNT(*)
    FROM chats 
    INNER JOIN offers_offer ON chats.offer_id=offers_offer.id
    INNER JOIN users_user ON 
        ((chats.author_id = :user_id AND users_user.id = chats.client_id) 
            OR (chats.client_id = :user_id AND users_user.id = chats.author_id))
        AND (((:search)::varchar IS NULL OR users_user.first_name ilike :search)
            OR ((:search)::varchar IS NULL OR users_user.last_name ilike :search))
    WHERE 
        chats.author_id = :user_id OR chats.client_id = :user_id 
        AND chats.is_done=FALSE
    """
    values = {
        "user_id": user_id,
        "search": search
    }
    count = await database.fetch_one(query=query, values=values)
    return int(count["count"]) if count else 0


async def is_chat_exist(chat_id: int) -> Optional[Mapping]:
    query = """
    SELECT
        chats.chat_id,
        chats.author_id,
        chats.client_id
    FROM chats
    WHERE chats.chat_id = :chat_id
    """
    return await database.fetch_one(query=query, values={"chat_id": chat_id})


async def get_messages(
        chat_id: int,
        offset: int = 0,
        limit: int = MESSAGES_SIZE,
) -> List[Dict]:
    query = """
    SELECT 
        messages.id,
        messages.text,
        messages.creation_datetime,
        messages.is_red,
        users_user.id as users_user,
        users_user.first_name,
        users_user.last_name,
        users_user.profile_img
    FROM messages
    INNER JOIN users_user ON users_user.id = messages.author_id
    WHERE messages.chat_id = :chat_id 
    ORDER BY messages.creation_datetime DESC
    LIMIT :limit
    OFFSET :offset
    """
    values = {
        "chat_id": chat_id,
        "offset": offset,
        "limit": limit,
    }
    return await database.fetch_all(query=query, values=values)


async def get_chat_uploads(chat_id: int) -> Dict[int, List[str]]:
    query = """
    SELECT 
        access_url,
        message_id
    FROM messages_uploads
    WHERE chat_id = :chat_id
    """
    rows = await database.fetch_all(query=query, values={"chat_id": chat_id})
    comment_images_map: Dict[int, List[str]] = {}
    for row in rows:
        comment_images_map.setdefault(row["message_id"], []).append(row["access_url"])
    return comment_images_map


async def count_messages(chat_id: int) -> int:
    query = """
    SELECT COUNT(*)
    FROM messages
    WHERE messages.chat_id = :chat_id
    """
    count = await database.fetch_one(query=query, values={"chat_id": chat_id})
    return int(count["count"]) if count else 0
