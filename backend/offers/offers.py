from datetime import date
from math import ceil
from typing import Callable, Dict, List, Optional, Tuple

from fastapi import APIRouter, Depends, HTTPException, Response

from config import PAGE_SIZE
from offers import crud
from offers.schemas import (
    CreateOfferResponse,
    MyOffersListItem,
    MyOffersListResponse,
    OfferDraftReply,
    OfferDraftRequest,
    OffersListItem,
    OffersListResponse,
    PublicOffersListItem,
    PublicOffersListResponse,
    RentalPeriod,
    StatusBodyData,
)
from offers.utils import (
    active_status_validator,
    archived_status_validator,
    draft_status_validator,
    inactive_status_validator,
    review_status_validator,
    set_active_status,
    set_archived_status,
    set_draft_status,
    set_inactive_status,
    set_review_status,
)
from utils import get_current_user, get_current_user_or_none

router = APIRouter(
    prefix="/offers",
    tags=["offers"],
)


@router.get("/offers/{chat_id}", response_model=OfferDraftReply)
async def get_offer_via_chat_id(
    chat_id: int, user_id: Optional[int] = Depends(get_current_user_or_none)
) -> OfferDraftReply:
    offer_id = await crud.chat_reference_offer_id(chat_id)
    if not offer_id:
        raise HTTPException(
            status_code=404,
            detail=f"Offer related with chat_id {chat_id} does not exist",
        )
    offer = await crud.get_offer(offer_id["offer_id"])
    if not offer:
        raise HTTPException(
            status_code=404,
            detail=f"No record in DB for offer with id {offer_id['offer_id']}",
        )
    offer_images = await crud.get_offers_images(offer_id["offer_id"])
    is_favorite = False
    is_promoted = False
    if promote_til_date := offer.get("promote_til_date"):
        is_promoted = date.today() < promote_til_date
    if user_id:
        is_favorite = await crud.is_offer_in_favorite_of_user(
            offer_id["offer_id"], user_id
        )
    return OfferDraftReply(
        **offer,
        images=offer_images,
        is_promoted=is_promoted,
        is_favorite=is_favorite,
    )


@router.patch("/status/{offer_id}")
async def change_status(
    offer_id: str,
    data: StatusBodyData,
    user_id: int = Depends(get_current_user),
) -> Response:
    actions_for_status: Dict[str, Tuple[Callable, Callable]] = {
        "ACTIVE": (active_status_validator, set_active_status),
        "REVIEW": (review_status_validator, set_review_status),
        "DRAFT": (draft_status_validator, set_draft_status),
        "INACTIVE": (inactive_status_validator, set_inactive_status),
        "ARCHIVED": (archived_status_validator, set_archived_status),
    }
    if errors := await actions_for_status[data.status.value][0](offer_id):
        return Response(status_code=403, content=errors)
    await actions_for_status[data.status.value][1](offer_id)
    return Response(status_code=204)


@router.get("/status/{tab_name}", response_model=MyOffersListResponse)
async def get_offers_for_tab(
    tab_name: str,
    user_id: int = Depends(get_current_user),
    page: int = 1,
) -> Dict:
    offset = (page - 1) * PAGE_SIZE
    limit = PAGE_SIZE
    statuses = {
        "all": [
            "ACTIVE",
            "ARCHIVED",
            "DRAFT",
            "FROZEN",
            "INACTIVE",
            "IN_RENT",
            "REJECTED",
            "REVIEW",
        ],
        "archive": ["ARCHIVED", "FROZEN", "INACTIVE", "REJECTED", "REVIEW"],
        "draft": ["DRAFT"],
        "active": ["ACTIVE"],
        "in-rent": ["IN_RENT"],
    }
    functions = {
        "ACTIVE": ["DO_INACTIVE", "ARCHIVE", "PROMOTE", "DO_DRAFT"],
        "ARCHIVED": ["DELETE", "DO_REVIEW", "EDIT"],
        "DRAFT": ["DO_REVIEW", "DELETE", "EDIT"],
        "FROZEN": ["ARCHIVE"],
        "INACTIVE": ["DO_DRAFT", "ARCHIVE", "DO_ACTIVE"],
        "IN_RENT": ["ARCHIVE"],
        "REJECTED": ["ARCHIVE", "DO_DRAFT"],
        "REVIEW": ["ARCHIVE"],
    }
    offers: list = await crud.get_offers_by_statuses(
        user_id=user_id,
        statuses=statuses[tab_name],
        limit=limit,
        offset=offset,
    )
    return {
        "data": [
            MyOffersListItem(
                **offer,
                functions=functions[offer["status"]],
                is_promoted=True
                if offer.get("promote_til_date")
                and date.today() < offer.get("promote_til_date")
                else False,
            )
            for offer in offers
        ],
        "total": ceil(
            await crud.count_founded_offers_by_statuses(
                user_id=user_id,
                statuses=statuses[tab_name],
                limit=limit,
                offset=offset,
            )
            / PAGE_SIZE
        ),
    }


# offers list for public profile page (only active offers)
@router.get("/public/{user_id}", response_model=PublicOffersListResponse)
async def get_public_profile_offers(
    user_id: int,
    auth_user_id: Optional[int] = Depends(get_current_user_or_none),
    page: int = 1,
) -> Dict:
    offset = (page - 1) * PAGE_SIZE
    limit = PAGE_SIZE

    offers: list = await crud.get_offers_by_statuses(
        user_id=user_id,
        statuses=["ACTIVE"],
        limit=limit,
        offset=offset,
    )
    founded_offer_ids = [offer["id"] for offer in offers]
    user_favorite_offers = set()
    if auth_user_id:
        user_favorite_offers = await crud.get_user_favorite_popular_offers(
            user_id=auth_user_id,
            popular_offer_ids=founded_offer_ids,
        )
    return {
        "data": [
            PublicOffersListItem(
                **offer,
                is_favorite=offer["id"] in user_favorite_offers,
                is_promoted=True
                if offer.get("promote_til_date")
                and date.today() < offer.get("promote_til_date")
                else False,
            )
            for offer in offers
        ],
        "total": ceil(
            await crud.count_founded_offers_by_statuses(
                user_id=user_id,
                statuses=["ACTIVE"],
                limit=limit,
                offset=offset,
            )
            / PAGE_SIZE
        ),
    }


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
    rental_period: RentalPeriod = RentalPeriod.DAY,
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
        rental_period=rental_period,
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
        offer_schema = OffersListItem(
            **offer,
            is_favorite=offer["id"] in user_favorite_offers_set,
        )
        if promote_til_date := offer.get("promote_til_date"):
            offer_schema.is_promoted = date.today() < promote_til_date
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
                rental_period=rental_period,
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
    await crud.increment_views_counter(offer_id)
    if not offer:
        raise HTTPException(
            status_code=404,
            detail=f"Offer with id {offer_id} does not exist",
        )
    chat_id = await crud.chat_id_via_offer_id(offer_id, user_id)
    offer_images = await crud.get_offers_images(offer_id)
    is_favorite = False
    is_promoted = False
    if promote_til_date := offer.get("promote_til_date"):
        is_promoted = date.today() < promote_til_date
    if user_id:
        is_favorite = await crud.is_offer_in_favorite_of_user(offer_id, user_id)
    return OfferDraftReply(
        **offer,
        chat_id=chat_id["chat_id"] if chat_id else None,
        images=offer_images,
        is_promoted=is_promoted,
        is_favorite=is_favorite,
    )


@router.post("", status_code=201, response_model=CreateOfferResponse)
async def create_offer(
    offer: OfferDraftRequest, author_id: int = Depends(get_current_user)
) -> Dict[str, str]:
    return {"id": await crud.create_offer_draft(offer, author_id)}


@router.patch("/{offer_id}", status_code=204)
async def update_offer(
    offer_id: str,
    update_offer_data: OfferDraftRequest,
    author_id: Optional[int] = Depends(get_current_user),
) -> Response:
    stored_offer_data = await crud.get_offer(offer_id)
    if not stored_offer_data:
        raise HTTPException(
            status_code=404,
            detail=f"Offer with id {offer_id} does not exist",
        )
    await crud.partial_update_offer(
        offer_id=offer_id,
        update_offer_data=update_offer_data,
        stored_offer_data=stored_offer_data,
    )
    return Response(status_code=204)


@router.delete("/{offer_id}", status_code=204)
async def delete_offer(
    offer_id: str,
    author_id: Optional[int] = Depends(get_current_user),
) -> Response:
    offer = await crud.get_offer(offer_id)
    if not offer:
        raise HTTPException(
            status_code=404,
            detail=f"Offer with id {offer_id} does not exist",
        )
    if not offer["status"] in ("DRAFT", "ARCHIVED"):
        raise HTTPException(
            status_code=403,
            detail="Deletion allowed only for offers in status 'DRAFT' or 'ARCHIVED'",
        )
    await crud.delete_offer(offer_id)
    return Response(status_code=204)
