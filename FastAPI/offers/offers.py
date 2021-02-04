from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, Header, Response, status, HTTPException

from FastAPI.offers import crud
from FastAPI.offers.schemas import OfferDraftReply, OfferDraftRequest

router = APIRouter(
    prefix="/offers",
    tags=["offers"],
)


async def get_current_user_or_none(
    authorization: Optional[str] = Header(None),
) -> Optional[int]:
    if authorization:
        token = authorization.split(" ")[-1]
        return await crud.get_user_id(token)
    else:
        return None


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
                detail="Invalid Authorisation Header format. Token cannot be blank.",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No Authorisation header supplied",
        )


@router.get("/{offer_id}", response_model=OfferDraftReply)
async def get_offer(
    offer_id: str,
    user_id: Optional[int] = Depends(get_current_user_or_none)
) -> OfferDraftReply:
    offer = await crud.get_offer(offer_id)
    offer_images = await crud.get_offers_images(offer_id)
    is_favorite = False
    is_promoted = False
    if promote_til_date := offer['promote_til_date']:
        is_promoted = date.today() < promote_til_date
    if user_id:
        is_favorite = await crud.is_offer_in_favotire_of_user(offer_id, user_id)
    return OfferDraftReply(
        **offer,
        images=offer_images,
        is_promoted=is_promoted,
        is_favorite=is_favorite,
    )


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
async def create_offer(
    offer: OfferDraftRequest, author_id: int = Depends(get_current_user)
) -> Response:
    pass
