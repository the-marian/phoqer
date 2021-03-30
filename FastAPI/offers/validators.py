from typing import Optional

from FastAPI.offers import crud
from FastAPI.offers.schemas import ValidOffer
from pydantic import ValidationError


async def set_review_status(offer_id: str) -> Optional[str]:
    offer = await crud.get_offer(offer_id) or {}
    try:
        ValidOffer(**offer)
        return None
    except ValidationError as e:
        return e.json()
