from typing import List, Mapping

from fastapi import APIRouter
from FastAPI.locations import crud
from FastAPI.locations.schemas import Cities, Countries

router = APIRouter(prefix="/locations", tags=["locations"])


@router.get("/countries/", response_model=List[Countries])
async def return_countries() -> List[Mapping]:
    countries = await crud.get_countries()
    return countries


@router.get("/cities/{slug}", response_model=List[Cities])
async def return_cities(slug: str) -> List[Mapping]:
    cities = await crud.get_cities(slug=slug)
    return cities
