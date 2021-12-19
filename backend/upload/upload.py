import uuid
from typing import Dict

import boto3
from boto3 import Session
from fastapi import APIRouter, Depends, File, UploadFile

import config
from utils import get_current_user

router = APIRouter(
    prefix="/upload",
    tags=["upload"],
)


def get_s3_client() -> Session:
    s3 = boto3.client(
        service_name="s3",
        region_name=config.AWS_REGION_NAME,
        aws_access_key_id=config.IAM_SES_USER_ACCESS_KEY,
        aws_secret_access_key=config.IAM_SES_USER_SECRET_KEY,
    )
    return s3


@router.post("")
def create_upload_file(
    file: UploadFile = File(...), author_id: int = Depends(get_current_user)
) -> Dict[str, str]:
    s3 = get_s3_client()
    file_name = f"{uuid.uuid4()}-{file.filename}".replace(" ", "_")
    s3.upload_fileobj(file.file, config.BUCKET_NAME, file_name)
    return {
        "image_url": f"https://phoqer-images.s3.eu-central-1.amazonaws.com/{file_name}"
    }
