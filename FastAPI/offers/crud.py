from typing import Any, List, Mapping, Optional, Set
from uuid import UUID

from FastAPI.config import PAGE_SIZE, database
from FastAPI.offers.schemas import OfferDraftRequest, Status
from pydantic import HttpUrl


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
        users_user.profile_img
    FROM offers_offer
    INNER JOIN users_user ON offers_offer.author_id=users_user.id
    LEFT JOIN categories_childcategories cc ON offers_offer.sub_category_id= cc.slug
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
async def create_offer_draft(offer: OfferDraftRequest, author_id: int) -> str:
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
        "price": offer.price,
        "title": offer.title,
        "views": offer.views,
    }
    offer_id: str = await database.execute(query=query, values=values)
    images = offer.images
    if images and offer_id:
        await create_offer_images(images=images, offer_id=offer_id)
    return offer_id


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


async def delete_all_offer_images(offer_id: str) -> None:
    query = "DELETE FROM offers_offerimages WHERE offer_id=:offer_id"
    await database.fetch_all(query=query, values={"offer_id": offer_id})


@database.transaction()
async def partial_update_offer(
    offer_id: str,
    update_offer_data: OfferDraftRequest,
    stored_offer_data: Mapping,
) -> None:
    stored_offer_model = OfferDraftRequest(**stored_offer_data)
    update_data = update_offer_data.dict(exclude_unset=True)
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
    await create_offer_images(images=update_offer_data.images, offer_id=offer_id)
    await database.execute(query=query, values=values)


def get_order_by_params(ordering_query: str) -> str:
    ordering_params = []
    for order_param in ordering_query.split(","):
        if order_param.startswith("-"):
            ordering_params.append(f"{order_param.strip('-')} DESC")
        else:
            ordering_params.append(f"{order_param}")
    return ", ".join(ordering_params)


async def find_offers(
    category: Optional[str] = None,
    city: Optional[str] = None,
    limit: int = PAGE_SIZE,
    offset: int = 0,
    sub_category: Optional[str] = None,
    is_deliverable: Optional[bool] = None,
    max_price: Optional[int] = None,
    min_price: Optional[int] = None,
    max_deposit: Optional[int] = None,
    min_deposit: Optional[int] = None,
    no_deposit: Optional[bool] = None,
    search: Optional[str] = None,
    ordering: str = "pub_date,-views",
) -> List[Mapping[str, Any]]:
    order_by_params = get_order_by_params(ordering_query=ordering)
    query = f"""
    SELECT
        cover_image,
        currency,
        description,
        id,
        is_deliverable,
        price,
        promote_til_date,
        pub_date,
        title,
        views
    FROM offers_offer
    WHERE status = 'ACTIVE'
      AND ((:category)::varchar IS NULL OR category_id = (:category)::varchar)
      AND ((:city)::varchar IS NULL OR city = (:city)::varchar)
      AND ((:sub_category)::varchar IS NULL OR sub_category_id = (:sub_category)::varchar)
      AND ((:is_deliverable)::bool IS NULL OR is_deliverable = (:is_deliverable)::bool)
      AND ((:max_price)::int IS NULL OR price <= (:max_price)::int)
      AND ((:min_price)::int IS NULL OR price >= (:min_price)::int)
      AND ((:max_deposit)::int IS NULL OR deposit_val <= (:max_deposit)::int)
      AND ((:min_deposit)::int IS NULL OR deposit_val >= (:min_deposit)::int)
      AND ((:no_deposit)::bool IS NULL OR deposit_val = 0)
      AND (((:search)::varchar IS NULL OR title ilike :search)
          OR
          ((:search)::varchar IS NULL OR description ilike :search))
    ORDER BY {order_by_params}
    LIMIT :limit
    OFFSET :offset
    """
    values = {
        "category": category,
        "sub_category": sub_category,
        "limit": limit,
        "offset": offset,
        "city": city,
        "is_deliverable": is_deliverable,
        "max_price": max_price,
        "min_price": min_price,
        "max_deposit": max_deposit,
        "min_deposit": min_deposit,
        "no_deposit": no_deposit,
        "search": f"%{search}%" if search else None,
    }
    return await database.fetch_all(query=query, values=values)


async def count_founded_offers(
    category: Optional[str] = None,
    city: Optional[str] = None,
    sub_category: Optional[str] = None,
    is_deliverable: Optional[bool] = None,
    max_price: Optional[int] = None,
    min_price: Optional[int] = None,
    max_deposit: Optional[int] = None,
    min_deposit: Optional[int] = None,
    no_deposit: Optional[bool] = None,
    search: Optional[str] = None,
) -> int:
    query = """
    SELECT count(*)
    FROM offers_offer
    WHERE status = 'ACTIVE'
      AND ((:category)::varchar IS NULL OR category_id = (:category)::varchar)
      AND ((:city)::varchar IS NULL OR city = (:city)::varchar)
      AND ((:sub_category)::varchar IS NULL OR sub_category_id = (:sub_category)::varchar)
      AND ((:is_deliverable)::bool IS NULL OR is_deliverable = (:is_deliverable)::bool)
      AND ((:max_price)::int IS NULL OR price <= (:max_price)::int)
      AND ((:min_price)::int IS NULL OR price >= (:min_price)::int)
      AND ((:max_deposit)::int IS NULL OR deposit_val <= (:max_deposit)::int)
      AND ((:min_deposit)::int IS NULL OR deposit_val >= (:min_deposit)::int)
      AND ((:no_deposit)::bool IS NULL OR deposit_val = 0)
      AND (((:search)::varchar IS NULL OR title ilike :search)
          OR
          ((:search)::varchar IS NULL OR description ilike :search))
    """
    values = {
        "category": category,
        "sub_category": sub_category,
        "city": city,
        "is_deliverable": is_deliverable,
        "max_price": max_price,
        "min_price": min_price,
        "max_deposit": max_deposit,
        "min_deposit": min_deposit,
        "no_deposit": no_deposit,
        "search": f"%{search}%" if search else None,
    }
    count = await database.fetch_one(query=query, values=values)
    return int(count["count"]) if count else 0


async def get_user_favorite_founded_offers(
    user_id: int,
    founded_offer_ids: List[UUID],
) -> Set[str]:
    query = """
    SELECT offer_id
    FROM offers_offer_favorite
    WHERE user_id = :user_id
      AND offer_id = ANY(:founded_offer_ids)
    """
    values = {
        "founded_offer_ids": founded_offer_ids,
        "user_id": user_id,
    }
    rows = await database.fetch_all(query=query, values=values)
    return {row["offer_id"] for row in rows}


async def get_popular_offers() -> List[Mapping]:
    query = """
    SELECT
        cover_image,
        currency,
        description,
        id,
        is_deliverable,
        price,
        promote_til_date,
        pub_date,
        title,
        views
    FROM offers_offer
    WHERE promote_til_date >= current_date
    ORDER BY random()
    LIMIT 8
    """
    return await database.fetch_all(query=query)


async def get_user_favorite_popular_offers(
    user_id: int, popular_offer_ids: List[UUID]
) -> Set[str]:
    query = """
    SELECT offer_id
    FROM offers_offer_favorite
    WHERE user_id = :user_id
      AND offer_id = ANY(:popular_offer_ids)
    """
    values = {
        "user_id": user_id,
        "popular_offer_ids": popular_offer_ids,
    }
    rows = await database.fetch_all(query=query, values=values)
    return {row["offer_id"] for row in rows}


async def get_offers_by_statuses(
    user_id: int, statuses: List[str], limit: int, offset: int
) -> List[Mapping]:
    query = """
    SELECT
        cover_image,
        currency,
        description,
        id,
        is_deliverable,
        price,
        promote_til_date,
        pub_date,
        status,
        title,
        views
    FROM offers_offer
    WHERE status = ANY(:statuses) AND author_id = :user_id
    LIMIT :limit
    OFFSET :offset
    """
    values = {
        "limit": limit,
        "offset": offset,
        "statuses": statuses,
        "user_id": user_id,
    }
    return await database.fetch_all(query=query, values=values)


async def count_founded_offers_by_statuses(
    user_id: int, statuses: List[str], limit: int, offset: int
) -> int:
    query = """
    SELECT COUNT(*)
    FROM offers_offer
    WHERE status = ANY(:statuses) AND author_id = :user_id
    """
    values = {
        "statuses": statuses,
        "user_id": user_id,
    }
    count = await database.fetch_one(query=query, values=values)
    return int(count["count"]) if count else 0


async def offer_set_status(offer_id: str, status: str) -> None:
    query = """
    UPDATE offers_offer
    SET status = :status
    WHERE id = :offer_id
    """
    values = {
        "offer_id": offer_id,
        "status": status,
    }
    await database.execute(query=query, values=values)


async def increment_views_counter(offer_id: str) -> None:
    query = "UPDATE offers_offer SET views = views + 1 WHERE id = :offer_id"
    values = {"offer_id": offer_id}
    await database.execute(query=query, values=values)
