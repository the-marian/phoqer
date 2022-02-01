from authlib.integrations.starlette_client import OAuth, StarletteRemoteApp
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordRequestForm
from starlette.config import Config
from starlette.requests import Request

import users.crud as users_crud
from config import ENVIRONMENT_URL
from login.schemas import Token
from login.utils import create_access_token, verify_password

config = Config()
oauth = OAuth(config)
oauth.register(
    name="google",
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
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
    user = await users_crud.get_user_by_email(email=form_data.username)
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


@router.get("/login/google")
async def login_with_google(request: Request) -> StarletteRemoteApp:
    redirect_uri = request.url_for("auth_with_google")
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/google", response_model=Token)
async def auth_with_google(request: Request) -> RedirectResponse:
    token = await oauth.google.authorize_access_token(request)
    user_info = await oauth.google.parse_id_token(request, token)
    user_data = await users_crud.get_user_by_email(user_info.email)
    if not user_data:
        await users_crud.create_user(
            email=user_info.email,
            first_name=user_info.given_name,
            last_name=user_info.family_name,
            account_type="GOOGLE",
            profile_img=user_info.picture,
        )
    elif user_data and user_data["account_type"] == "INTERNAL":
        return RedirectResponse(f"{ENVIRONMENT_URL}/auth?status_code={400}")
    user_data = await users_crud.get_user_by_email(user_info.email)
    token = create_access_token(subject=user_data["email"], user_id=user_data["id"])
    return RedirectResponse(f"{ENVIRONMENT_URL}/auth?status_code={200}&token={token}")
