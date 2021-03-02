from typing import List, Optional

from fastapi import APIRouter, Depends, Header, HTTPException, Response, status
from FastAPI.favorite import crud
from FastAPI.offers.schemas import OffersListItem

router = APIRouter(
    prefix="/favorite",
    tags=["favorite"],
)


async def get_current_user(
    authorization: Optional[str] = Header(None),
) -> Optional[int]:
    if authorization:
        if token := authorization.partition(" ")[2]:
            user_id = await crud.get_user_id(token)
            if user_id:
                return user_id
            else:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Token does not exist",
                )
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Authorisation Header format. "
                       "Token cannot be blank.",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No Authorisation header supplied",
        )


@router.get("", response_model=List[OffersListItem])
async def get_is_favorite(
    user_id: Optional[int] = Depends(get_current_user),
) -> List[OffersListItem]:
    if user_id:
        row = await crud.offers_in_favorite(user_id)
        return [
            OffersListItem(
                **offer,
                is_favorite=True,
            )
            for offer in row
        ]
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token does not exist"
        )


@router.patch("/{offer_id}", status_code=status.HTTP_204_NO_CONTENT)
async def add_to_favorite_or_delete_if_exist(
        offer_id: str, user_id: int = Depends(get_current_user),
) -> Response:
    await crud.add_offer_to_favorite_or_delete(user_id, offer_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
