from __future__ import annotations

from datetime import date
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, HttpUrl


class CommentRequest(BaseModel):
    body: str
    offer_id: UUID
    replies_id: Optional[int] = None
    images: List[HttpUrl] = []


class CommentReply(CommentRequest):
    author_id: int
    dislike: bool = False
    dislikes: int = 0
    id: int
    last_name: str
    first_name: str
    profile_img: Optional[HttpUrl] = None
    like: bool = False
    likes: int = 0
    pub_date: date
    replies: List[CommentReply] = []


CommentReply.update_forward_refs()
