from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from starlette.requests import Request

from login import crud
from login.schemas import Token
from login.utils import create_access_token, verify_password

from authlib.integrations.starlette_client import OAuth
from starlette.config import Config

import users.crud as users_crud

config = Config()
oauth = OAuth(config)
oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)
router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> dict:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = await crud.get_user(email=form_data.username)
    if not user or not verify_password(form_data.password, user.get("password", "")):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not user.get("is_active"):
        raise HTTPException(status_code=400, detail="Inactive user")
    return {
        "access_token": create_access_token(
            subject=form_data.username, user_id=user["id"]
        ),
        "token_type": "bearer",
    }


@router.get('/login/google')
async def login(request: Request):
    redirect_uri = request.url_for('auth_with_google')
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.post("/auth/google", response_model=Token)
async def auth_with_google(request: Request) -> dict:
    token = await oauth.google.authorize_access_token(request)
    user_info = await oauth.google.parse_id_token(request, token)
    user_data = await crud.get_user(user_info.email)
    if not user_data:
        await users_crud.create_user(user_data=user_info)
        user_data = await crud.get_user(user_info.email)
    if user_data and user_data["account_info"] == "GOOGLE":
        raise HTTPException(status_code=400, detail="User already exist. Use login by email instead.")
    return {
        "access_token": create_access_token(
            subject=user_data["username"], user_id=user_data["id"]
        ),
        "token_type": "bearer",
    }
