from typing import Optional

from pydantic import ValidationError

from FastAPI.offers import crud
from FastAPI.chats.crud import chat_is_approved_update
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


async def set_in_rent_status(offer_id: str, chat_id: int) -> None:
    offer = await crud.get_offer(offer_id)
    await chat_is_approved_update(chat_id)
    if offer and offer["items_amount"] > 1:
        await crud.decrease_items_amount(offer_id)
        await crud.offer_set_status(offer_id=offer_id, status=Status.ACTIVE.value)
    else:
        await crud.offer_set_status(offer_id=offer_id, status=Status.IN_RENT.value)

