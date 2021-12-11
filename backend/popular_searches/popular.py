import random
from typing import Dict, List

from fastapi import APIRouter

from config import POPULAR_SEARCH_SIZE

router = APIRouter(
    prefix="/popular-searches",
    tags=["popular-searches"],
)


@router.get("")
async def get_popular_searches() -> Dict[str, List[str]]:
    ua = [
        "Iphone",
        "PS5",
        "VR",
        "Машина",
        "AirPods Pro",
        "Гітара",
        "Apple Watch",
        "Nintendo Switch",
        "Настільні ігри",
        "Кавомашина",
        "Велосипед",
        "Сноуборд",
        "Телевізор",
        "Робот-пилосос",
        "Samsung",
        "DJI Mavic",
        "Galaxy Z Flip",
        "Навушники",
        "Canon",
        "3d принтер",
    ]
    en = [
        "Iphone",
        "PS5",
        "VR",
        "Carrent",
        "AirPods Pro",
        "Guitar",
        "Nintendo Switch",
        "Laptop",
        "Board game ",
        "Coffee maker",
        "Bike",
        "Snowboard",
        "TV",
        "Vacuum cleaner",
        "Samsung",
        "DJI Mavic",
        "Galaxy Z Flip",
        "Headphones",
        "Canon",
        "3d printer",
    ]
    ru = [
        "Iphone",
        "PS5",
        "VR",
        "Машина",
        "Apple Watch",
        "Гитара",
        "AirPods Pro",
        "Nintendo Switch",
        "Настольные игры",
        "Пентхаус",
        "Велосипед",
        "Сноуборд",
        "Телевизор",
        "Робот-пылесос",
        "Samsung",
        "DJI Mavic",
        "Galaxy Z Flip",
        "Наушники",
        "Canon 500px",
        "3d принтер",
    ]
    return {
        "ua": random.sample(ua, POPULAR_SEARCH_SIZE),
        "en": random.sample(en, POPULAR_SEARCH_SIZE),
        "ru": random.sample(ru, POPULAR_SEARCH_SIZE),
    }
