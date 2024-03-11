from typing import Optional

from pydantic import BaseModel


class Pagination(BaseModel):
    limit: int
    currentPage: int
    totalItems: int
    totalPages: int


class User(BaseModel):
    id: str
    firstName: str
    lastName: str
    avatar: Optional[str]
    createdAt: Optional[int]
