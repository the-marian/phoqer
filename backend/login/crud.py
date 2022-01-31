from typing import Mapping

from config import database
from login.utils import verify_password


async def get_user(email: str) -> Mapping:
    query = """
    SELECT
        id,
        password,
        last_login,
        is_superuser,
        first_name,
        last_name,
        is_staff,
        is_active,
        date_joined,
        bio,
        birth_date,
        email,
        profile_img,
        country,
        city
    FROM users_user
    WHERE email = :email
    """
    user = await database.fetch_one(query=query, values={"email": email})
    if not user:
        return {}
    return user
