from pydantic import EmailStr

from FastAPI.config import database
from FastAPI.users.schemas import UserCreateRequest


async def get_user_by_email(email: EmailStr) -> bool:
    query = """
    SELECT
        email,
        is_superuser
    FROM public.users_user
    WHERE email = :email
    """
    return await database.fetch_one(query=query, values={"email": email})


async def create_user(user_data: UserCreateRequest, hashed_password: str):
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
        "last_name": user_data.second_name,
        "is_staff": False,
        "is_active": False,
        "bio": "",
        "location": "",
        "birth_date": None,
        "email": user_data.email,
        "profile_img": None,
    }
    return await database.execute(query=query, values=values)
