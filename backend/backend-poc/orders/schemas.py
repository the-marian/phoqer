from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

from offers.schemas import Sale, OfferCategory
from schemas import Pagination, User


class Status(str, Enum):
    DONE = "done"
    PENDING = "pending"
    ACCEPTED = "accepted"
    IN_PROGRESS = "in_progress"
    REJECTED = "rejected"


class Order(BaseModel):
    id: str
    offerId: str
    title: str
    price: int
    description: str
    images: List[str]
    sale: Optional[Sale]
    category: OfferCategory
    status: Status
    country: str
    city: str
    zip: str
    address: str
    comment: Optional[str]
    date: str
    expired: Optional[str]
    startDate: Optional[int]
    user: User


class OrderList(Pagination):
    data: List[Order]


class OrderBody(BaseModel):
    offerId: str
    country: str
    city: str
    zip: str
    address: str
    comment: Optional[str]


class UpdateOrderBody(BaseModel):
    ids: List[str]
    status: str


class DeleteOrderBody(BaseModel):
    ids: List[str]
