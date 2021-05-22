from FastAPI.locations.schemas import Countries, Cities
from FastAPI.locations import crud
from typing import List
from fastapi import APIRouter

router = APIRouter(
    prefix="/locations",
    tags=["locations"]
)


@router.get("/countries/", response_model=List[Countries])
async def return_countries():
    countries = await crud.get_countries()
    return countries


@router.get("/cities/{slug}", response_model=List[Cities])
async def return_cities(slug: str):
    cities = await crud.get_cities(slug=slug)
    return cities
