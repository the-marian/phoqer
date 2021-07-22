from typing import Any, Dict, List, Mapping, Optional

from FastAPI.config import CHAT_SIZE, MESSAGES_SIZE, database
from pydantic import HttpUrl


async def get_chats(
    user_id: int,
    offset: int = 0,
    limit: int = CHAT_SIZE,
    search: Optional[str] = None,
) -> List[Mapping[str, Any]]:
    query = """
    SELECT
        chats.chat_id,
        offers_offer.cover_image,
        offers_offer.title,
        (SELECT COUNT(*)
            FROM messages
            WHERE
              messages.chat_id = chats.chat_id
              AND
              messages.is_red = FALSE
              AND NOT
              messages.author_id = :user_id)
        AS new_messages,
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
    values = {"user_id": user_id, "offset": offset, "limit": limit, "search": search}
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
    values = {"user_id": user_id, "search": search}
    count = await database.fetch_one(query=query, values=values)
    return int(count["count"]) if count else 0


async def chat_reference_offer_id(chat_id: int) -> Optional[Mapping]:
    query = "SELECT offer_id FROM chats WHERE chat_id = :chat_id"
    return await database.fetch_one(query=query, values={"chat_id": chat_id})


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
) -> List[Mapping[str, Any]]:
    query = """
    SELECT
        messages.id,
        messages.text AS encrypted_text,
        messages.creation_datetime,
        messages.is_red,
        users_user.id as user_id,
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


@database.transaction()
async def create_message(
    message: str,
    chat_id: int,
    user_id: int,
    access_urls: List[HttpUrl],
) -> int:
    query = """
    INSERT INTO messages (
        text,
        chat_id,
        author_id,
        creation_datetime)
    VALUES (
        :text,
        :chat_id,
        :author_id,
        current_timestamp)
    RETURNING id
    """
    values = {"text": message, "chat_id": chat_id, "author_id": user_id}
    message_id = int(await database.execute(query=query, values=values))
    if access_urls:
        await create_messages_uploads(
            access_urls=access_urls, chat_id=chat_id, message_id=message_id
        )
    return message_id


async def create_messages_uploads(
    access_urls: List[HttpUrl],
    chat_id: int,
    message_id: int,
) -> None:
    query = """
    INSERT INTO messages_uploads (access_url, message_id, chat_id)
    VALUES (:access_url, :message_id, :chat_id)
    """
    values = []
    for access_url in access_urls:
        values.append(
            {"access_url": access_url, "message_id": message_id, "chat_id": chat_id}
        )
    return await database.execute_many(query=query, values=values)


async def get_message(message_id: int) -> Optional[Mapping]:
    query = """
    SELECT
        messages.id,
        messages.text,
        messages.creation_datetime,
        messages.is_red,
        users_user.id as user_id,
        users_user.first_name,
        users_user.last_name,
        users_user.profile_img
    FROM messages
    INNER JOIN users_user ON users_user.id = messages.author_id
    WHERE messages.id = :message_id
    """
    values = {"message_id": message_id}
    return await database.fetch_one(query=query, values=values)


async def create_chat(offer_id: str, author_id: int, client_id: int) -> int:
    query = """
    INSERT INTO chats (
        author_id,
        client_id,
        offer_id,
        creation_datetime)
    VALUES (
        :author_id,
        :client_id,
        :offer_id,
        current_timestamp)
    RETURNING chat_id
    """
    values = {"author_id": author_id, "client_id": client_id, "offer_id": offer_id}
    return int(await database.execute(query=query, values=values))
