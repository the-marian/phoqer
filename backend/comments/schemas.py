from datetime import date
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, HttpUrl


class CommentRequest(BaseModel):
    body: str
    offer_id: UUID
    replies_id: Optional[int] = None
    images: List[HttpUrl] = []


class CommentResponse(CommentRequest):
    author_id: int
    dislike: bool = False
    dislikes: int = 0
    id: int
    images: List[HttpUrl] = []
    like: bool = False
    likes: int = 0
    pub_date: date
    replies: List['CommentResponse'] = []


CommentResponse.update_forward_refs()
