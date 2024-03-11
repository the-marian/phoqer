from fastapi import APIRouter

from utils import get_json_path

router = APIRouter(prefix="/ratings", tags=["ratings"])
json_file_path = get_json_path("ratings")


@router.get("")
async def get_offer_ratings() -> None:
    pass