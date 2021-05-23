from typing import List, Mapping

from FastAPI.config import database


async def get_countries() -> List[Mapping]:
    query = """SELECT countries.slug FROM countries"""
    return await database.fetch_all(query=query)


async def get_cities(slug: str) -> List[Mapping]:
    query = """
    SELECT
        cities.slug
    FROM cities WHERE countries_slug = :slug
    """
    return await database.fetch_all(query=query, values={"slug": slug})
