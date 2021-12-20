from typing import Optional

from pydantic import ValidationError

from offers import crud
from offers.schemas import Status, ValidOffer


async def active_status_validator(offer_id: str) -> None:
    return None


async def review_status_validator(offer_id: str) -> Optional[str]:
    offer = await crud.get_offer(offer_id) or {}
    try:
        ValidOffer(**offer)
        return None
    except ValidationError as e:
        return e.json()


async def in_rent_status_validator(offer_id: str) -> None:
    return None


async def draft_status_validator(offer_id: str) -> None:
    return None


async def set_draft_status(offer_id: str) -> None:
    await crud.offer_set_status(offer_id=offer_id, status=Status.DRAFT.value)


async def inactive_status_validator(offer_id: str) -> None:
    return None


async def set_inactive_status(offer_id: str) -> None:
    await crud.offer_set_status(offer_id=offer_id, status=Status.INACTIVE.value)


async def archived_status_validator(offer_id: str) -> None:
    return None


async def set_archived_status(offer_id: str) -> None:
    await crud.offer_set_status(offer_id=offer_id, status=Status.ARCHIVED.value)


async def set_active_status(offer_id: str) -> None:
    await crud.offer_set_status(offer_id=offer_id, status=Status.ACTIVE.value)


async def set_review_status(offer_id: str) -> None:
    await crud.offer_set_status(offer_id=offer_id, status=Status.ACTIVE.value)
