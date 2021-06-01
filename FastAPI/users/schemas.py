from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, HttpUrl


class UserBase(BaseModel):
    city: Optional[str]
    country: Optional[str]
    date_joined: date
    first_name: str
    id: int
    last_activity: datetime
    last_name: str
    profile_img: Optional[HttpUrl]


class UserCreateRequest(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    password: str


class User(UserBase):
    bio: Optional[str]
    birth_date: Optional[date]
    communication_rate: int = 0
    description_rate: int = 0
    dislikes: int = 0
    email: EmailStr
    likes: int = 0
    response_rate: int = 0
    satisfaction_rate: int = 0


class UserPartialUpdate(BaseModel):
    bio: Optional[str]
    birth_date: Optional[date]
    city: Optional[str]
    country: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    profile_img: Optional[HttpUrl]


class ShortUser(UserBase):
    pass
