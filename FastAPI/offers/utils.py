from typing import Optional

from FastAPI.offers import crud
from FastAPI.offers.schemas import Status, ValidOffer
from pydantic import ValidationError


async def review_status_validator(offer_id: str) -> Optional[str]:
    offer = await crud.get_offer(offer_id) or {}
    try:
        ValidOffer(**offer)
        return None
    except ValidationError as e:
        return e.json()


async def set_review_status(offer_id: str) -> None:
    await crud.offer_set_status(offer_id=offer_id, status=Status.ACTIVE.value)
