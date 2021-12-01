import random
from typing import Dict, List

from fastapi import APIRouter

router = APIRouter(
    prefix="/popular-searches",
    tags=["popular-searches"],
)


@router.get("")
async def get_popular_searches() -> Dict[str, List[str]]:
    ua = ["Iphone", "PS5", "VR", "Каршерінг", "Квартира", "Гітара", "Офіс", "AR", "Ігри"]
    en = ["Iphone", "PS5", "VR", "Carrent", "Apartment", "Guitar", "AR", "Laptop", "Game"]
    ru = ["Iphone", "PS5", "VR", "Каршеринг", "Квартира", "Гитара", "Офис", "AR", "Игры"]
    return {
        "ua": random.sample(ua, len(ua)),
        "en": random.sample(en, len(en)),
        "ru": random.sample(ru, len(ru)),
    }
