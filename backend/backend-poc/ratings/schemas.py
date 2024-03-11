from pydantic import BaseModel

from schemas import User


class OfferCategory(BaseModel):
    author: User
    authorScore: float
    averageScore: float
