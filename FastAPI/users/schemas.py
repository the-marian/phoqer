# Shared properties
from typing import Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    is_superuser: bool = False
    first_name: Optional[str] = None
    second_name: Optional[str] = None


# Properties to receive via API on creation
class UserCreateRequest(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    second_name: str
