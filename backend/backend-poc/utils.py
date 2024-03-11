import os
import math

from typing import List, Any


def get_json_path(tag: str, file: str = None) -> str:
    if file:
        return os.path.join(os.getcwd(), tag, "assets", f"{file}.json")
    else:
        return os.path.join(os.getcwd(), tag, "assets", f"{tag}.json")


def pagination(data: List[Any], limit: int, page: int):
    total = len(data)
    stat_index = (page - 1) * limit
    end_index = limit * page

    return {
        "limit": limit,
        "currentPage": page,
        "totalItems": total,
        "totalPages": math.ceil(total / limit),
        "data": data[stat_index:end_index],
    }
