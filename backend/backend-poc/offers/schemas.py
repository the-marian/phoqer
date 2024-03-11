from enum import Enum
from typing import List, Optional
from pydantic import BaseModel

from schemas import Pagination, User


class OfferStatusEnum(str, Enum):
    ACTIVE = 'active'
    DISABLED = 'disabled'


class OfferCategory(BaseModel):
    slug: str
    title: str


class Sale(BaseModel):
    percentage: int
    description: Optional[str]


class Offer(BaseModel):
    id: str
    title: str
    price: int
    description: str
    images: List[str]
    author: User
    sale: Optional[Sale]
    category: OfferCategory
    reviews: int


class OfferCard(BaseModel):
    id: str
    price: int
    title: str
    authorId: str
    category: str
    sale: Optional[int]
    image: Optional[str]


class AuthorOffer(Offer):
    status: str


class OfferList(Pagination):
    data: List[OfferCard]


class AuthorOfferList(Pagination):
    data: List[AuthorOffer]


class OfferCardCreate(BaseModel):
    title: str
    description: str
    category: str
    price: int
    images: List[str]


class UploadBody(BaseModel):
    images: List[str]  # images: List[HttpUrl]


class SearchOffer(BaseModel):
    id: str
    title: str
    category: str
    categorySlug: str
