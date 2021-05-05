from pydantic import BaseModel
from pydantic import AnyUrl
from typing import List, Optional


class ChildCategory(BaseModel):
    icon_image: Optional[str]
    slug: str


class ParentCategory(BaseModel):
    icon_image: Optional[str]
    image: Optional[AnyUrl]
    slug: str
    sub_category: List[ChildCategory] = []


class AllCategory(ParentCategory, ChildCategory):
    parent_id: Optional[str]
