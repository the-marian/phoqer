from typing import List
from json import load

from utils import pagination
from offers.schemas import OfferCard, OfferList
from utils import get_json_path


def normalize_offer_card(offer: dict) -> OfferCard:
    offer["category"] = offer["category"]["title"]

    sale = offer.get("sale", None)
    if sale:
        offer["sale"] = sale.get("percentage", None)
    else:
        offer["sale"] = None

    return OfferCard(
        **offer,
        image=offer["images"][0],
        authorId=offer["author"]["id"],
    )


def normalize_offers_list(offers: List[dict], limit: int, page: int) -> OfferList:
    return pagination(list(map(normalize_offer_card, offers)), limit, page)


def count_reviews(offer_id: str) -> int:
    """Returns first level reviews for ost"""
    with open(get_json_path("reviews")) as json_file:
        reviews = load(json_file)
        offer_reviews = []

        for review in reviews["data"]:
            if review["offerId"] == offer_id and review.get("parent") is None:
                review["replies"] = len(list(filter(lambda x: x.get("parent") == review["id"], reviews["data"])))
                offer_reviews.append(review)

        return len(offer_reviews)
