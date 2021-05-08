from typing import List, Mapping

from FastAPI.config import database


async def get_parent_category() -> List[Mapping]:
    query = """
    SELECT
        categories_parentcategories.image,
        categories_parentcategories.is_active,
        categories_parentcategories.priority,
        categories_parentcategories.slug,
        categories_parentcategories.icon_image
    FROM categories_parentcategories
    WHERE is_active = True ORDER BY priority
    """
    return await database.fetch_all(query=query)


async def get_child_category() -> List[Mapping]:
    query = """
    SELECT
        categories_childcategories.slug,
        categories_childcategories.parent_id,
        categories_childcategories.icon_image
    FROM categories_childcategories
    """
    return await database.fetch_all(query=query)
