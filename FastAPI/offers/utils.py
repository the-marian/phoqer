from typing import Optional

from pydantic import ValidationError

from FastAPI.offers import crud
from FastAPI.offers.schemas import Status, ValidOffer


async def review_status_validator(offer_id: str) -> Optional[str]:
    offer = await crud.get_offer(offer_id) or {}
    try:
        ValidOffer(**offer)
        return None
    except ValidationError as e:
        return e.json()


async def in_rent_status_validator(offer_id: str) -> None:
    return None


async def set_review_status(offer_id: str) -> None:
    await crud.offer_set_status(offer_id=offer_id, status=Status.ACTIVE.value)


async def set_in_rent_status(offer_id: str) -> None:
    offer = await crud.get_offer(offer_id)
    if offer and offer["items_amount"] > 0:
        await crud.decrease_items_amount(offer_id)
        await crud.offer_set_status(offer_id=offer_id, status=Status.ACTIVE.value)
    else:
        await crud.offer_set_status(offer_id=offer_id, status=Status.IN_RENT.value)
