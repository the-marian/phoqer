from datetime import date
from math import ceil
from typing import Dict, List, Optional

from fastapi import APIRouter, Depends, Header, HTTPException, Response, status
from FastAPI.config import PAGE_SIZE
from FastAPI.offers import crud
from FastAPI.offers.schemas import (
    OfferDraftReply,
    OfferDraftRequest,
    OffersListItem,
    OffersListResponse,
)

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


@router.get("/popular", response_model=List[OffersListItem])
async def get_popular_offers(
    user_id: Optional[int] = Depends(get_current_user_or_none),
) -> List[OffersListItem]:
    popular_offers = await crud.get_popular_offers()
    popular_offer_ids = [offer["id"] for offer in popular_offers]
    user_favorite_popular_offers = set()
    if user_id:
        user_favorite_popular_offers = await crud.get_user_favorite_popular_offers(
            user_id=user_id,
            popular_offer_ids=popular_offer_ids,
        )
    return [
        OffersListItem(
            **offer,
            is_promoted=True,
            is_favorite=offer["id"] in user_favorite_popular_offers,
        )
        for offer in popular_offers
    ]


@router.get("/search", response_model=OffersListResponse)
async def search_offers(
    category: Optional[str] = None,
    city: Optional[str] = None,
    is_deliverable: Optional[bool] = None,
    max_deposit: Optional[int] = None,
    max_price: Optional[int] = None,
    min_deposit: Optional[int] = None,
    min_price: Optional[int] = None,
    no_deposit: Optional[bool] = None,
    ordering: str = "pub_date",
    page: int = 1,
    search: Optional[str] = None,
    sub_category: Optional[str] = None,
    user_id: Optional[int] = Depends(get_current_user_or_none),
) -> Dict:
    offset = (page - 1) * PAGE_SIZE
    limit = PAGE_SIZE
    founded_offers = await crud.find_offers(
        category=category,
        city=city,
        limit=limit,
        offset=offset,
        sub_category=sub_category,
        is_deliverable=is_deliverable,
        max_price=max_price,
        min_price=min_price,
        max_deposit=max_deposit,
        min_deposit=min_deposit,
        no_deposit=no_deposit,
        search=search,
        ordering=ordering,
    )
    founded_offer_ids = [offer["id"] for offer in founded_offers]
    user_favorite_offers_set = set()
    if user_id:
        user_favorite_offers_set = await crud.get_user_favorite_founded_offers(
            user_id=user_id,
            founded_offer_ids=founded_offer_ids,
        )
    data = []
    for offer in founded_offers:
        offer_schema = OffersListItem(**offer)
        if promote_til_date := offer.get("promote_til_date"):
            offer_schema.is_promoted = date.today() < promote_til_date
        if user_id:
            offer_schema.is_favorite = offer_schema.id in user_favorite_offers_set
        data.append(offer_schema)
    return {
        "data": data,
        "total": ceil(
            await crud.count_founded_offers(
                category=category,
                city=city,
                sub_category=sub_category,
                is_deliverable=is_deliverable,
                max_price=max_price,
                min_price=min_price,
                max_deposit=max_deposit,
                min_deposit=min_deposit,
                no_deposit=no_deposit,
                search=search,
            )
            / PAGE_SIZE
        ),
    }


@router.get("/{offer_id}", response_model=OfferDraftReply)
async def get_offer(
    offer_id: str, user_id: Optional[int] = Depends(get_current_user_or_none)
) -> OfferDraftReply:
    offer = await crud.get_offer(offer_id)
    if not offer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Offer with id {offer_id} does not exist",
        )
    offer_images = await crud.get_offers_images(offer_id)
    is_favorite = False
    is_promoted = False
    if promote_til_date := offer.get("promote_til_date"):
        is_promoted = date.today() < promote_til_date
    if user_id:
        is_favorite = await crud.is_offer_in_favorite_of_user(offer_id, user_id)
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
    await crud.create_offer_draft(offer, author_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch("/{offer_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_offer(
    offer_id: str,
    update_offer_data: OfferDraftRequest,
    author_id: Optional[int] = Depends(get_current_user),
) -> Response:
    stored_offer_data = await crud.get_offer(offer_id)
    if not stored_offer_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Offer with id {offer_id} does not exist",
        )
    await crud.partial_update_offer(
        offer_id=offer_id,
        update_offer_data=update_offer_data,
        stored_offer_data=stored_offer_data,
    )
    return Response(status_code=status.HTTP_204_NO_CONTENT)
