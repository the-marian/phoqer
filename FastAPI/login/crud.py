from typing import Mapping

from FastAPI.config import database
from FastAPI.login.utils import verify_password


async def get_user(email: str, password: str) -> Mapping:
    query = """
    SELECT
        id,
        password,
        is_active
    FROM users_user
    WHERE email = :email
    """
    user = await database.fetch_one(query=query, values={"email": email})
    if not user:
        return {}
    if not verify_password(password, user.get("password", "")):
        return {}
    return user
