from __future__ import annotations

from datetime import date
from enum import Enum
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, HttpUrl


class Status(Enum):
    ACTIVE = "ACTIVE"
    ARCHIVED = "ARCHIVED"
    DRAFT = "DRAFT"
    FROZEN = "FROZEN"
    INACTIVE = "INACTIVE"
    IN_RENT = "IN_RENT"
    REJECTED = "REJECTED"
    REVIEW = "REVIEW"


class Currency(Enum):
    EUR = "EUR"
    NONE = None
    PLN = "PLN"
    UAH = "UAH"
    USD = "USD"


class OfferDraftRequest(BaseModel):
    category: Optional[str] = None
    city: Optional[str] = None
    cover_image: Optional[HttpUrl] = None
    currency: Currency = Currency.UAH
    deposit_val: Optional[int] = None
    description: Optional[str] = None
    doc_needed: bool = False
    extra_requirements: Optional[str] = None
    images: List[HttpUrl] = []
    is_deliverable: bool = False
    max_rent_period: Optional[int] = None
    min_rent_period: Optional[int] = None
    price: Optional[int] = None
    sub_category: Optional[str] = None
    title: Optional[str] = None
    views: int = 0


class OfferDraftReply(OfferDraftRequest):
    author_id: int
    first_name: str
    id: UUID
    is_favorite: bool
    is_promoted: bool
    last_name: str
    profile_img: Optional[HttpUrl] = None
    pub_date: date
    status: Status


class OffersListItem(BaseModel):
    cover_image: Optional[HttpUrl] = None
    currency: Currency
    description: str
    id: UUID
    is_deliverable: bool
    is_favorite: bool = False
    is_promoted: bool = False
    price: int
    pub_date: date
    title: str
    views: int


class OffersListResponse(BaseModel):
    total: int = 0
    data: List[OffersListItem]


class MyOffersListItem(BaseModel):
    cover_image: Optional[HttpUrl] = None
    currency: Optional[Currency] = None
    description: Optional[str] = None
    functions: List[str]
    id: UUID
    is_deliverable: Optional[bool] = None
    is_promoted: bool = False
    price: Optional[int] = None
    pub_date: Optional[date] = None
    title: Optional[str] = None
    views: Optional[int] = None


class MyOffersListResponse(BaseModel):
    total: int = 0
    data: List[MyOffersListItem]


class ValidOffer(BaseModel):
    city: str
    currency: Currency
    description: str
    doc_needed: bool
    extra_requirements: str
    is_deliverable: bool
    price: int
    pub_date: date
    status: Status
    title: str
    category: str
