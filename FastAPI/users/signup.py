from fastapi import APIRouter, HTTPException, status

from FastAPI.users import crud
from FastAPI.users.schemas import UserCreateRequest
from FastAPI.users.utils import get_password_hash

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.post("/signup", status_code=status.HTTP_204_NO_CONTENT)
async def create_user_open(
    user_request: UserCreateRequest
):
    """
    Create new user
    """
    user = await crud.get_user_by_email(email=user_request.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system",
        )
    user = await crud.create_user(
        user_data=user_request,
        hashed_password=get_password_hash(user_request.password),
    )
    # send_new_account_email(
    #     email_to=user_in.email, username=user_in.email, password=user_in.password
    # )
    return user
