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
    with open(f"{MEDIA_ROOT}/{file.filename}-{uuid.uuid4()}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"image_url": MEDIA_URL + file.filename}
