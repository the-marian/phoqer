from pydantic import BaseModel
from typing import List


class Countries(BaseModel):
    slug: str


class Cities(BaseModel):
    slug: str
