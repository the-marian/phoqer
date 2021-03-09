from fastapi import APIRouter, Depends, HTTPException
from FastAPI.login import crud
from FastAPI.login.schemas import Token
from FastAPI.login.utils import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> dict:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = await crud.get_user(email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not user.get("is_active"):
        raise HTTPException(status_code=400, detail="Inactive user")
    return {
        "access_token": create_access_token(
            subject=form_data.username, user_id=user["id"]
        ),
        "token_type": "bearer",
    }
