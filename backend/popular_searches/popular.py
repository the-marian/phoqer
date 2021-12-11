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
    ua = ["Iphone", "PS5", "VR", "Каршерінг", "Квартира",
          "Гітара", "Офіс", "AR", "Ігри", "Пентхаус",
          "Зброя", "Сноуборд", "Телевізор", "Робот-пилосос", "Samsung",
          "DJI Mavic", "Galaxy Z Flip", "Навушники", "Canon 500px", "3d принтер"]
    en = ["Iphone", "PS5", "VR", "Carrent", "Apartment",
          "Guitar", "AR", "Laptop", "Game", "Penthouse",
          "Guns", "Snowboard", "TV", "Vacuum cleaner", "Samsung",
          "DJI Mavic", "Galaxy Z Flip", "Headphones", "Canon 500px", "3d"]
    ru = ["Iphone", "PS5", "VR", "Каршеринг", "Квартира",
          "Гитара", "Офис", "AR", "Игры", "Пентхаус",
          "Оружие", "Сноуборд", "Телевизор", "Робот-пылесос", "Samsung",
          "DJI Mavic", "Galaxy Z Flip", "Наушники", "Canon 500px", "3d принтер"]
    return {
        "ua": random.sample(ua, POPULAR_SEARCH_SIZE),
        "en": random.sample(en, POPULAR_SEARCH_SIZE),
        "ru": random.sample(ru, POPULAR_SEARCH_SIZE),
    }
