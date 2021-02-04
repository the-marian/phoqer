from typing import Mapping, List, Union

from pydantic import HttpUrl

from FastAPI.config import database


async def get_user_id(token: str) -> Union[int, None]:
    query = "SELECT user_id FROM authtoken_token WHERE key = :key"
    row = await database.fetch_one(query=query, values={"key": token})
    return row["user_id"] if row else None


async def get_offer(offer_id: str) -> Mapping:
    query = """
    SELECT
        offers_offer.id,
        offers_offer.views,
        offers_offer.promote_til_date,
        offers_offer.status,
        offers_offer.pub_date,
        offers_offer.author_id,
        offers_offer.category_id AS "category",
        offers_offer.city,
        offers_offer.cover_image,
        offers_offer.currency,
        offers_offer.deposit_val,
        offers_offer.max_rent_period,
        offers_offer.min_rent_period,
        offers_offer.sub_category_id AS "sub_category",
        offers_offer.price,
        offers_offer.description,
        offers_offer.title,
        offers_offer.doc_needed,
        offers_offer.is_deliverable,
        offers_offer.extra_requirements,
        users_user.first_name,
        users_user.last_name,
        users_user.profile_img,
        cp.name AS "category_name",
        cc.name AS "sub_category_name"
    FROM offers_offer
    INNER JOIN users_user ON offers_offer.author_id=users_user.id
    INNER JOIN categories_childcategories cc ON offers_offer.sub_category_id=cc.slug 
    INNER JOIN categories_parentcategories cp on offers_offer.category_id = cp.slug 
    WHERE offers_offer.id=:offer_id
    """
    return await database.fetch_one(query=query, values={"offer_id": offer_id})


async def get_offers_images(offer_id: str) -> List[HttpUrl]:
    query = "SELECT url FROM offers_offerimages WHERE offer_id=:offer_id"
    rows = await database.fetch_all(query=query, values={"offer_id": offer_id})
    return [row['url'] for row in rows]
