from typing import Mapping

from FastAPI.config import database
from FastAPI.users.schemas import UserCreateRequest
from pydantic import EmailStr


async def user_exist(email: EmailStr) -> bool:
    query = "SELECT TRUE FROM users_user WHERE email = :email"
    return bool(await database.fetch_one(query=query, values={"email": email}))


async def create_user(user_data: UserCreateRequest, hashed_password: str) -> None:
    query = """
    INSERT INTO users_user (
        password,
        last_login,
        is_superuser,
        first_name,
        last_name,
        is_staff,
        is_active,
        date_joined,
        bio,
        location,
        birth_date,
        email,
        profile_img)
    VALUES (
        :password,
        current_date,
        :is_superuser,
        :first_name,
        :last_name,
        :is_staff,
        :is_active,
        current_date,
        :bio,
        :location,
        :birth_date,
        :email,
        :profile_img)
    """
    values = {
        "password": hashed_password,
        "is_superuser": False,
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "is_staff": False,
        "is_active": False,
        "bio": "",
        "location": "",
        "birth_date": None,
        "email": user_data.email,
        "profile_img": None,
    }
    await database.execute(query=query, values=values)


async def activate_user(email: EmailStr) -> None:
    query = "UPDATE users_user SET is_active = TRUE WHERE email = :email"
    await database.execute(query=query, values={"email": email})


async def get_user(user_id: int) -> Mapping:
    query = """
    SELECT
        bio,
        birth_date,
        date_joined,
        email,
        first_name,
        id,
        last_login AS last_activity,
        last_name,
        location,
        profile_img
    FROM users_user
    WHERE id = :id
    """
    return await database.fetch_one(query=query, values={"id": user_id}) or {}


async def get_short_user(user_id: int) -> Mapping:
    query = """
    SELECT
        date_joined,
        first_name,
        id,
        last_login AS last_activity,
        last_name,
        location,
        profile_img
    FROM users_user
    WHERE id = :id
    """
    return await database.fetch_one(query=query, values={"id": user_id}) or {}
