import pytest
from fastapi import status
from FastAPI.main import app
from FastAPI.offers.crud import get_offer
from httpx import AsyncClient


def test_get_offer(client, offer_ps4):
    response = client.get("offers/a30b8a1e-1c60-4bbc-ac3d-37df2d224000")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "author_id": 1,
        "category": "technics",
        "city": "warsaw",
        "country": "poland",
        "cover_image": "http://phoqer.com/mediafiles/52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
        "currency": "PLN",
        "deposit_val": 500,
        "description": "Konsola Sony PlayStation 4 Nowa!",
        "doc_needed": False,
        "extra_requirements": "Zdęcie dowodu osobistego",
        "first_name": "Marian",
        "id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224000",
        "images": [],
        "is_deliverable": True,
        "is_favorite": False,
        "is_promoted": True,
        "items_amount": 1,
        "last_name": "Zozulia",
        "max_rent_period": 100,
        "min_rent_period": 3,
        "price": 100,
        "profile_img": "http://phoqer.com/mediafiles/0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
        "pub_date": "2021-05-21",
        "rental_period": "DAY",
        "status": "ACTIVE",
        "sub_category": "consoles",
        "title": "SONY PlayStation 4",
        "views": 1,
    }


def test_is_favorite_user_with_favorite(client, auth_token):
    response = client.get(
        "offers/1a114c8e-14b7-46e4-8ad0-f251a35a6938", headers=auth_token
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["is_favorite"] is True


def test_is_favorite_user_with_no_favorite(client, auth_token):
    response = client.get(
        "offers/7cea9f56-e211-467b-8515-aa88f4a4a5c3", headers=auth_token
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["is_favorite"] is False


@pytest.mark.asyncio
async def test_create_offer_draft(client, auth_token):
    post_data = {
        "category": "business",
        "city": "kyiv",
        "country": "poland",
        "cover_image": "https://example.com/iphone.jpeg",
        "currency": "UAH",
        "deposit_val": 666,
        "description": "New Phone",
        "doc_needed": True,
        "extra_requirements": "text exta req",
        "images": [
            "http://phoqer.com//mediafiles/image(1)_H802r7h.jpeg",
            "http://phoqer.com//mediafiles/image(2)_bGKHdms.jpeg",
            "http://phoqer.com//mediafiles/image(3)_PV4BY6L.jpeg",
            "http://phoqer.com//mediafiles/image(4)_SCiBiMz.jpeg",
            "http://phoqer.com//mediafiles/5_zDDUs4j.jpg",
            "http://phoqer.com//mediafiles/4_QsbenAd.jpg",
            "http://phoqer.com//mediafiles/3_5vqrqhm.jpg",
            "http://phoqer.com//mediafiles/2_5jbRqfd.jpg",
            "http://phoqer.com//mediafiles/1_RrQEWYc.jpg",
        ],
        "is_deliverable": True,
        "items_amount": 3,
        "max_rent_period": 10,
        "min_rent_period": 20,
        "price": 499,
        "sub_category": "sub_category",
        "title": "Iphone 12",
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("offers", json=post_data, headers=auth_token)

    db_response = await get_offer(response.json()["id"])
    assert db_response.get("price") == 499
    assert response.status_code == status.HTTP_201_CREATED
    assert "id" in response.json()
    assert type(response.json()["id"]) is str


def test_create_offer_not_authed(client):
    post_data = {}
    response = client.post(
        "offers",
        json=post_data,
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_my_offers_not_authed(client, auth_token):
    response = client.get("offers/status/all")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_get_my_offers(client, auth_token):
    response = client.get("offers/status/all", headers=auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "cover_image": "https://example.com/iphone.jpeg",
                "currency": "UAH",
                "description": "New Phone 17",
                "functions": ["DO_ACTIVE", "ARCHIVE"],
                "id": "6c2d804e-b916-4d1c-82ec-73508ebd2845",
                "is_deliverable": True,
                "is_promoted": False,
                "price": None,
                "pub_date": "2021-01-15",
                "title": None,
                "views": 0,
            },
            {
                "cover_image": None,
                "currency": None,
                "description": None,
                "functions": ["DO_ACTIVE", "ARCHIVE"],
                "id": "0e5b47f0-ac19-4d67-83d8-3046a987bc86",
                "is_deliverable": None,
                "is_promoted": False,
                "price": None,
                "pub_date": "2021-01-15",
                "title": None,
                "views": 0,
            },
            {
                "cover_image": None,
                "currency": None,
                "description": None,
                "functions": ["DO_ACTIVE", "ARCHIVE"],
                "id": "d9560917-3db3-44a0-89a7-9b5076df73cd",
                "is_deliverable": None,
                "is_promoted": False,
                "price": None,
                "pub_date": "2021-01-15",
                "title": None,
                "views": 0,
            },
            {
                "cover_image": "http://phoqer.com//mediafiles/0_PrBB7kx.jpg",
                "currency": None,
                "description": "sfsdsdf",
                "functions": ["DO_ACTIVE", "ARCHIVE"],
                "id": "ffbaafb0-b94e-4b27-9699-c04e25f09190",
                "is_deliverable": False,
                "is_promoted": False,
                "price": 4334,
                "pub_date": "2021-01-21",
                "title": "name",
                "views": 0,
            },
        ],
        "total": 20,
    }


def test_get_public_profile_offers(client):
    response = client.get("offers/public/1")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "cover_image": "https://example.com/iphone.jpeg",
                "currency": "UAH",
                "description": "New Phone 17",
                "id": "6c2d804e-b916-4d1c-82ec-73508ebd2845",
                "is_deliverable": True,
                "is_promoted": False,
                "price": None,
                "pub_date": "2021-01-15",
                "title": None,
                "views": 0,
            },
            {
                "cover_image": None,
                "currency": None,
                "description": None,
                "id": "0e5b47f0-ac19-4d67-83d8-3046a987bc86",
                "is_deliverable": None,
                "is_promoted": False,
                "price": None,
                "pub_date": "2021-01-15",
                "title": None,
                "views": 0,
            },
            {
                "cover_image": None,
                "currency": None,
                "description": None,
                "id": "d9560917-3db3-44a0-89a7-9b5076df73cd",
                "is_deliverable": None,
                "is_promoted": False,
                "price": None,
                "pub_date": "2021-01-15",
                "title": None,
                "views": 0,
            },
            {
                "cover_image": "http://phoqer.com//mediafiles/0_PrBB7kx.jpg",
                "currency": None,
                "description": "sfsdsdf",
                "id": "ffbaafb0-b94e-4b27-9699-c04e25f09190",
                "is_deliverable": False,
                "is_promoted": False,
                "price": 4334,
                "pub_date": "2021-01-21",
                "title": "name",
                "views": 0,
            },
        ],
        "total": 20,
    }


def test_change_status(client, auth_token):
    data = {"status": "REVIEW"}
    response = client.patch(
        "offers/status/a9795a7d-67ac-4e63-bdd2-cecc1ce8a5df",
        json=data,
        headers=auth_token,
    )
    assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
    assert response.json() == [
        {
            "loc": ["cover_image"],
            "msg": "none is not an allowed value",
            "type": "type_error.none.not_allowed",
        },
        {
            "loc": ["currency"],
            "msg": "none is not an allowed value",
            "type": "type_error.none.not_allowed",
        },
        {
            "loc": ["deposit_val"],
            "msg": "none is not an allowed value",
            "type": "type_error.none.not_allowed",
        },
        {"loc": ["category"], "msg": "field required", "type": "value_error.missing"},
        {
            "loc": ["sub_category"],
            "msg": "field required",
            "type": "value_error.missing",
        },
    ]


def test_change_status_2(client, auth_token):
    data = {"status": "REVIEW"}
    response = client.patch(
        "offers/status/412498ef-4a3e-4ad3-9af0-e8dcc513c92a",
        json=data,
        headers=auth_token,
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_update_offer_country(client, auth_token):
    post_data = {"country": "ukraine"}
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.patch(
            "offers/412498ef-4a3e-4ad3-9af0-e8dcc513c92a",
            json=post_data,
            headers=auth_token,
        )

    assert response.status_code == 204
    db_response = await get_offer("412498ef-4a3e-4ad3-9af0-e8dcc513c92a")
    assert db_response.get("country") == "ukraine"


def test_search(client, auth_token):
    response = client.get("/search/?rental_period=DAY", headers=auth_token)
    assert response.json() == {
        "author_id": 2,
        "category": "business",
        "city": "kyiv",
        "country": "poland",
        "cover_image": "https://example.com/iphone.jpeg",
        "currency": "UAH",
        "deposit_val": 666,
        "description": "New Phone",
        "doc_needed": True,
        "extra_requirements": "text exta req",
        "first_name": "Marian",
        "id": "00bbddd5-92bf-45e5-8d2c-8e23fb03da63",
        "images": [
            "http://phoqer.com//mediafiles/image(1)_H802r7h.jpeg",
            "http://phoqer.com//mediafiles/image(2)_bGKHdms.jpeg",
            "http://phoqer.com//mediafiles/image(3)_PV4BY6L.jpeg",
            "http://phoqer.com//mediafiles/image(4)_SCiBiMz.jpeg",
            "http://phoqer.com//mediafiles/5_zDDUs4j.jpg",
            "http://phoqer.com//mediafiles/4_QsbenAd.jpg",
            "http://phoqer.com//mediafiles/3_5vqrqhm.jpg",
            "http://phoqer.com//mediafiles/2_5jbRqfd.jpg",
            "http://phoqer.com//mediafiles/1_RrQEWYc.jpg",
        ],
        "is_deliverable": True,
        "is_favorite": False,
        "is_promoted": False,
        "items_amount": 1,
        "last_name": "Zozulia",
        "max_rent_period": 10,
        "min_rent_period": 20,
        "price": 499,
        "profile_img": None,
        "pub_date": "2021-05-23",
        "rental_period": None,
        "status": "DRAFT",
        "sub_category": "sub_category",
        "title": "Iphone 12",
        "views": 0,
    }


def test_delete_offer(client, auth_token):
    response = client.delete(
        "/offers/4f3b43f0-9eb1-463d-8eaa-69eb428f5639", headers=auth_token
    )
    assert response.status_code == 204
