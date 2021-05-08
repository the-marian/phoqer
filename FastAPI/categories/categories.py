from typing import List

from fastapi import APIRouter
from FastAPI.categories import crud
from FastAPI.categories.schemas import AllCategory, ParentCategory

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=List[ParentCategory])
async def return_category() -> List[ParentCategory]:
    parent_category = await crud.get_parent_category()
    child_category = await crud.get_child_category()
    all_categories = parent_category + child_category
    categories_map = {
        category["slug"]: AllCategory(**category) for category in all_categories
    }

    for category in categories_map.values():
        if parent_id := category.parent_id:
            categories_map[parent_id].sub_category.append(category)
    return [category for category in categories_map.values() if not category.parent_id]
