import os
import shutil
import uuid
from typing import Dict

from fastapi import APIRouter, Depends, File, UploadFile
from FastAPI.config import MEDIA_ROOT, MEDIA_URL
from FastAPI.utils import get_current_user

router = APIRouter(
    prefix="/upload",
    tags=["upload"],
)


@router.post("")
def create_upload_file(
    file: UploadFile = File(...), author_id: int = Depends(get_current_user)
) -> Dict[str, str]:
    try:
        os.mkdir(MEDIA_ROOT)
    except FileExistsError:
        pass
    uuid_prefix = uuid.uuid4()
    file_name = f"{uuid_prefix}-{file.filename}".replace(" ", "_")
    with open(os.path.join(MEDIA_ROOT, file_name), "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"image_url": f"/{MEDIA_URL}/{file_name}"}
