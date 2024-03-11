from typing import List, Optional
from pydantic import BaseModel

from schemas import Pagination, User


class Reviews(BaseModel):
    id: str
    date: int
    offerId: str
    description: str
    images: List[str]
    author: User
    score: Optional[int]
    replies: Optional[int]


class ReviewsList(Pagination):
    data: List[Reviews]


class ReviewPhotos(BaseModel):
    id: str
    date: int
    images: List[str]
    author: User


class ReviewPhotosList(Pagination):
    data: List[ReviewPhotos]
