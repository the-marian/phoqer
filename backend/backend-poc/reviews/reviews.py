from json import load

from fastapi import APIRouter

from reviews.schemas import ReviewsList, ReviewPhotos, ReviewPhotosList
from utils import get_json_path, pagination

router = APIRouter(prefix="/reviews", tags=["reviews"])
json_file_path = get_json_path("reviews")


@router.get("/{offer_id}", response_model=ReviewsList)
async def get_offers_reviews(offer_id: str, limit: int = 5, page: int = 1) -> ReviewsList:
    """Returns first level reviews for ost"""
    with open(json_file_path) as json_file:
        reviews = load(json_file)
        offer_reviews = []

        for review in reviews["data"]:
            if review["offerId"] == offer_id and review.get("parent") is None:
                review["replies"] = len(list(filter(lambda x: x.get("parent") == review["id"], reviews["data"])))
                offer_reviews.append(review)

        return pagination(offer_reviews, limit, page)


@router.get("/{offer_id}/replies/{reviews_id}", response_model=ReviewsList)
async def get_offers_reviews(offer_id: str, reviews_id: str, limit: int = 5, page: int = 1) -> ReviewsList:
    """Returns replies to comment"""
    with open(json_file_path) as json_file:
        reviews = load(json_file)
        offer_reviews = []

        for review in reviews["data"]:
            if review["offerId"] == offer_id and review.get("parent") == reviews_id:
                offer_reviews.append(review)

        return pagination(offer_reviews, limit, page)


@router.get("/{offer_id}/photos", response_model=ReviewPhotosList)
async def get_photos(offer_id: str, limit: int = 5, page: int = 1) -> ReviewPhotosList:
    with open(json_file_path) as json_file:
        reviews = load(json_file)
        offer_reviews = []

        for review in reviews["data"]:
            if review["offerId"] == offer_id and len(review["images"]) != 0:
                offer_reviews.append(ReviewPhotos(**review))

        return pagination(offer_reviews, limit, page)
