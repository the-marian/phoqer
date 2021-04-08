from typing import List

from fastapi import APIRouter, Depends, Response, status
from FastAPI.favorite import crud
from FastAPI.offers.schemas import OffersListItem
from FastAPI.utils import get_current_user

router = APIRouter(
    prefix="/favorite",
    tags=["favorite"],
)


@router.get("", response_model=List[OffersListItem])
async def get_favorite_for_user(
    user_id: int = Depends(get_current_user),
) -> List[OffersListItem]:
    queryset = await crud.get_favorite_offers_of_user(user_id)
    return [
        OffersListItem(
            **offer,
            is_favorite=True,
        )
        for offer in queryset
    ]


@router.patch("/{offer_id}", status_code=status.HTTP_204_NO_CONTENT)
async def add_to_favorite_or_delete_if_exist(
    offer_id: str,
    user_id: int = Depends(get_current_user),
) -> Response:
    await crud.add_offer_to_favorite_or_delete(user_id, offer_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
