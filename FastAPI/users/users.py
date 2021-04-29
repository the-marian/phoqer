from typing import Mapping

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.responses import RedirectResponse
from FastAPI.users import crud
from FastAPI.users.schemas import ShortUser, User, UserCreateRequest
from FastAPI.users.utils import (
    get_activation_jwt,
    get_password_hash,
    send_new_account_email,
)
from FastAPI.utils import decode_jwt, get_current_user

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.post("/signup", status_code=status.HTTP_204_NO_CONTENT)
async def create_user_open(user: UserCreateRequest) -> Response:
    """
    Create new user
    """
    if await crud.user_exist(email=user.email):
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system",
        )
    await crud.create_user(
        user_data=user,
        hashed_password=get_password_hash(user.password),
    )
    activation_token = get_activation_jwt(user.email)
    send_new_account_email(
        email_to=user.email,
        username=user.email,
        activation_token=activation_token,
    )
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/activation/{jwt}", status_code=status.HTTP_307_TEMPORARY_REDIRECT)
async def activate_user(jwt: str) -> RedirectResponse:
    """
    Activate user
    """
    user_email = decode_jwt(jwt).get("sub")
    if not user_email:
        raise HTTPException(
            status_code=400,
            detail="Invalid JWT",
        )
    await crud.activate_user(user_email)
    return RedirectResponse(f"http://phoqer.com/auth/confirmation?userId={user_email}")


@router.get("/me", response_model=User)
async def logged_in_user_details(user_id: int = Depends(get_current_user)) -> Mapping:
    """
    Get logged in user details
    """
    return await crud.get_user(user_id)


@router.get("/short/{user_id}", response_model=ShortUser)
async def get_short_user_details(user_id: int) -> Mapping:
    """
    Get short user details by user_id
    """
    return await crud.get_short_user(user_id)


@router.get("/{user_id}", response_model=User)
async def get_user_details(user_id: int) -> Mapping:
    """
    Get user details by user_id
    """
    return await crud.get_user(user_id)
