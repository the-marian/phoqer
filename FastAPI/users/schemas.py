from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, HttpUrl


class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    is_superuser: bool = False
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserCreateRequest(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str


class User(BaseModel):
    bio: Optional[str]
    birth_date: Optional[date]
    communication_rate: int = 0
    date_joined: datetime
    description_rate: int = 0
    dislikes: int = 0
    email: EmailStr
    first_name: str
    id: int
    last_name: str
    likes: int = 0
    location: Optional[str]
    profile_img: Optional[HttpUrl]
    response_rate: int = 0
    satisfaction_rate: int = 0
