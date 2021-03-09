from datetime import datetime
from typing import Optional, TypedDict

import jwt
from fastapi import Depends
from FastAPI import config
from FastAPI.config import ALGORITHM, database
from fastapi.security import OAuth2PasswordBearer
from pydantic import EmailStr

optional_login = OAuth2PasswordBearer(tokenUrl="auth/login", auto_error=False)
oauth2_schema = OAuth2PasswordBearer(tokenUrl="auth/login")


class JWTPayload(TypedDict):
    user_id: int
    sub: EmailStr
    exp: datetime


def decode_jwt(token: str) -> JWTPayload:
    return jwt.decode(token, config.SECRET_KEY, algorithms=[ALGORITHM])  # type: ignore


async def get_user_id(token: str) -> Optional[int]:
    query = "SELECT user_id FROM authtoken_token WHERE key = :key"
    row = await database.fetch_one(query=query, values={"key": token})
    return row["user_id"] if row else None


async def get_current_user_or_none(
    token: str = Depends(optional_login),
) -> Optional[int]:
    if token:
        return decode_jwt(token)["user_id"]
    else:
        return None


async def get_current_user(token: str = Depends(oauth2_schema)) -> int:
    return decode_jwt(token)["user_id"]
