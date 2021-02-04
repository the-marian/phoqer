from __future__ import annotations

from datetime import date
from enum import Enum
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, HttpUrl


class Status(Enum):
    DRAFT = "DRAFT"
    REVIEW = "REVIEW"
    ACTIVE = "ACTIVE"
    REJECTED = "REJECTED"
    INACTIVE = "INACTIVE"
    IN_RENT = "IN_RENT"
    ARCHIVED = "ARCHIVED"
    FROZEN = "FROZEN"


class Currency(Enum):
    EUR = "EUR"
    PLN = "PLN"
    UAH = "UAH"
    USD = "USD"


class OfferDraftRequest(BaseModel):
    category: Optional[str] = None
    category_name: Optional[str] = None
    city: Optional[str] = None
    cover_image: Optional[HttpUrl] = None
    currency: Optional[Currency] = None
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
    sub_category_name: Optional[str] = None
    title: Optional[str] = None


class OfferDraftReply(OfferDraftRequest):
    author_id: int
    views: int
    id: UUID
    last_name: str
    first_name: str
    status: Status = Status.DRAFT
    profile_img: Optional[HttpUrl] = None
    pub_date: date
    is_promoted: bool
