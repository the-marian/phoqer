from typing import List, Mapping, Optional

from pydantic import HttpUrl

from FastAPI.config import database
from FastAPI.offers.schemas import OfferDraftRequest, Status


async def get_user_id(token: str) -> Optional[int]:
    query = "SELECT user_id FROM authtoken_token WHERE key = :key"
    row = await database.fetch_one(query=query, values={"key": token})
    return row["user_id"] if row else None


async def get_offer(offer_id: str) -> Optional[Mapping]:
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
    LEFT JOIN categories_childcategories cc ON offers_offer.sub_category_id=cc.slug
    LEFT JOIN categories_parentcategories cp on offers_offer.category_id = cp.slug
    WHERE offers_offer.id=:offer_id
    """
    return await database.fetch_one(query=query, values={"offer_id": offer_id})


async def get_offers_images(offer_id: str) -> List[HttpUrl]:
    query = "SELECT url FROM offers_offerimages WHERE offer_id=:offer_id"
    rows = await database.fetch_all(query=query, values={"offer_id": offer_id})
    return [row["url"] for row in rows]


async def is_offer_in_favorite_of_user(offer_id: str, user_id: int) -> bool:
    query = """
    SELECT TRUE
    FROM offers_offer_favorite
    WHERE offer_id=:offer_id
      AND user_id=:user_id
    """
    values = {"user_id": user_id, "offer_id": offer_id}
    row = await database.fetch_one(query=query, values=values)
    return True if row else False


@database.transaction()
async def create_offer_draft(offer: OfferDraftRequest, author_id: int) -> None:
    query = """
    INSERT INTO offers_offer (
        author_id,
        category_id,
        city,
        cover_image,
        currency,
        deposit_val,
        description,
        doc_needed,
        extra_requirements,
        id,
        is_deliverable,
        max_rent_period,
        min_rent_period,
        price,
        pub_date,
        status,
        sub_category_id,
        title,
        views)
    VALUES (
        :author_id,
        :category_id,
        :city,
        :cover_image,
        :currency,
        :deposit_val,
        :description,
        :doc_needed,
        :extra_requirements,
        uuid_generate_v4(),
        :is_deliverable,
        :max_rent_period,
        :min_rent_period,
        :price,
        current_date,
        :status,
        :sub_category_id,
        :title,
        :views)
    RETURNING id
    """
    values = {
        "category_id": offer.category,
        "status": Status.DRAFT.value,
        "author_id": author_id,
        "city": offer.city,
        "cover_image": offer.cover_image,
        "currency": offer.currency.value,
        "deposit_val": offer.deposit_val,
        "description": offer.description,
        "doc_needed": offer.doc_needed,
        "extra_requirements": offer.extra_requirements,
        "is_deliverable": offer.is_deliverable,
        "max_rent_period": offer.max_rent_period,
        "min_rent_period": offer.min_rent_period,
        "sub_category_id": offer.sub_category,
        "title": offer.title,
        "views": offer.views,
    }
    offer_id = await database.execute(query=query, values=values)
    images = offer.images
    if images and offer_id:
        await create_offer_images(images=images, offer_id=offer_id)
    return None


async def create_offer_images(images: List[HttpUrl], offer_id: str) -> None:
    name = "empty_name"
    query = """
    INSERT INTO offers_offerimages (url, name, offer_id)
    VALUES (:url, :name, :offer_id)"""
    values = [
        {
            "url": image_url,
            "name": name,
            "offer_id": offer_id,
        }
        for image_url in images
    ]
    await database.execute_many(query=query, values=values)


async def delete_all_offer_images(offer_id: str):
    query = "DELETE FROM offers_offerimages WHERE offer_id=:offer_id"
    await database.fetch_all(query=query, values={"offer_id": offer_id})


@database.transaction()
async def partial_update_offer(offer_id: str, offer: OfferDraftRequest) -> None:
    stored_offer_data = await get_offer(offer_id)
    stored_offer_model = OfferDraftRequest(**stored_offer_data)
    update_data = offer.dict(exclude_unset=True)
    updated_offer = stored_offer_model.copy(update=update_data)
    query = """
    UPDATE offers_offer
    SET
        category_id = :category_id,
        city = :city,
        cover_image = :cover_image,
        currency = :currency,
        deposit_val = :deposit_val,
        description = :description,
        doc_needed = :doc_needed,
        extra_requirements = :extra_requirements,
        is_deliverable = :is_deliverable,
        max_rent_period = :max_rent_period,
        min_rent_period = :min_rent_period,
        price = :price,
        sub_category_id = :sub_category_id,
        title = :title
    WHERE id=:offer_id
    """
    values = {
        "category_id": updated_offer.category,
        "city": updated_offer.city,
        "cover_image": updated_offer.cover_image,
        "currency": updated_offer.currency.value,
        "deposit_val": updated_offer.deposit_val,
        "description": updated_offer.description,
        "doc_needed": updated_offer.doc_needed,
        "extra_requirements": updated_offer.extra_requirements,
        "is_deliverable": updated_offer.is_deliverable,
        "max_rent_period": updated_offer.max_rent_period,
        "min_rent_period": updated_offer.min_rent_period,
        "offer_id": offer_id,
        "price": updated_offer.price,
        "sub_category_id": updated_offer.sub_category,
        "title": updated_offer.title,
    }
    await delete_all_offer_images(offer_id)
    await create_offer_images(images=offer.images, offer_id=offer_id)
    await database.execute(query=query, values=values)
