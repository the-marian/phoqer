import random
from typing import Dict

from fastapi import APIRouter

router = APIRouter(
    prefix="/popular-searches",
    tags=["popular-searches"],
)


@router.get("")
async def get_popular_searches() -> Dict:
    ua = ["Iphone", "PS5", "VR", "Каршеринг", "Квартира", "Гитара"]
    en = ["Iphone", "PS5", "VR", "Carrent", "Apartment", "Guitar"]
    pl = ["Telefon komorkowy", "PS5", "VR", "Samochody", "Apartament", "Gitara"]
    return {
        "ua": random.sample(ua, len(ua)),
        "en": random.sample(en, len(en)),
        "pl": random.sample(pl, len(pl)),
    }
