from json import load
from time import sleep

from fastapi import APIRouter, HTTPException

from users.schemas import UserAccount, UsersList
from utils import get_json_path, pagination

router = APIRouter(prefix="/users", tags=["users"])
user_json = get_json_path(tag="users", file="user")
users_json = get_json_path(tag="users", file="users")


@router.get("", response_model=UserAccount)
async def get_user_info() -> UserAccount:
    with open(user_json) as json_file:
        return load(json_file)


@router.get("/search", response_model=UsersList)
async def search_users(query: str, accountType: str = None, limit: int = 15, page: int = 1) -> UsersList:
    sleep(1)

    with open(users_json) as json_file:
        users = load(json_file)

        if not query and not accountType:
            return pagination(users, limit, page)

        result = []
        if not query and accountType:
            for user in users:
                if user["accountType"] == accountType:
                    result.append(user)

            return pagination(result, limit, page)

        lower_query = query.lower()
        if not accountType:
            for user in users:
                if (lower_query in user["firstName"].lower()) or (lower_query in user["lastName"].lower()):
                    result.append(user)

            return pagination(result, limit, page)

        for user in users:
            is_match = (lower_query in user["firstName"].lower()) or (lower_query in user["lastName"].lower())
            if user["accountType"] == accountType and is_match:
                result.append(user)

        return pagination(result, limit, page)


@router.get("/{user_id}", response_model=UserAccount)
async def get_user_by_id(user_id: str) -> UserAccount:
    sleep(1)
    with open(users_json) as json_file:
        users = load(json_file)
        for user in users:
            if user["id"] == user_id:
                return user

        raise HTTPException(status_code=404, detail="Not found")
