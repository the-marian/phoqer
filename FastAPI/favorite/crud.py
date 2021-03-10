from typing import List, Mapping, Optional

from FastAPI.config import database


async def get_user_id(token: str) -> Optional[int]:
    query = "SELECT user_id FROM authtoken_token WHERE key = :key"
    row = await database.fetch_one(query=query, values={"key": token})
    return row["user_id"] if row else None


async def get_favorite_offers_of_user(user_id: int) -> List[Mapping]:
    query = """
    SELECT
        cover_image,
        currency,
        description,
        offers_offer.id,
        is_deliverable,
        price,
        pub_date,
        title,
        views
    FROM offers_offer
    INNER JOIN offers_offer_favorite
    ON offers_offer_favorite.offer_id = offers_offer.id
    WHERE offers_offer_favorite.user_id = :user_id
    """
    return await database.fetch_all(query=query, values={"user_id": user_id})


async def add_offer_to_favorite_or_delete(user_id: int, offer_id: str) -> None:
    query = """
    SELECT TRUE
    FROM offers_offer_favorite
    WHERE offer_id=:offer_id
      AND user_id=:user_id
    """
    row = await database.fetch_one(
        query=query, values={"user_id": user_id, "offer_id": offer_id}
    )
    if row:
        await remove_favorite(user_id, offer_id)
    else:
        await add_favorite(user_id, offer_id)


async def remove_favorite(user_id: int, offer_id: str) -> None:
    query = """
    DELETE FROM offers_offer_favorite
    WHERE offer_id =:offer_id AND user_id =:user_id
    """
    await database.execute(query=query, values={"user_id": user_id, "offer_id": offer_id})


async def add_favorite(user_id: int, offer_id: str) -> None:
    query = """
    INSERT INTO offers_offer_favorite (user_id, offer_id)
    VALUES (:user_id, :offer_id)
    """
    await database.execute(query=query, values={"user_id": user_id, "offer_id": offer_id})
