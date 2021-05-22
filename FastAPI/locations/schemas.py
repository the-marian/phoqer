from pydantic import BaseModel


class Countries(BaseModel):
    slug: str


class Cities(BaseModel):
    slug: str
