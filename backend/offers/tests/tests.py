import pytest

from offers import crud

pytestmark = pytest.mark.asyncio


async def test_get_offer(client, offer_ps4):
    response = await client.get(f"/offers/{offer_ps4}")
    assert response.status_code == 200
    assert response.json() == {
        "author_id": 1,
        "category": "technics",
        "chat_id": None,
        "city": "warsaw",
        "country": "poland",
        "cover_image": "http://phoqer.com/mediafiles/"
        "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
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
        "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
        "pub_date": "2021-05-21",
        "rental_period": "DAY",
        "status": "ACTIVE",
        "sub_category": "consoles",
        "title": "SONY PlayStation 4",
        "views": 1,
    }


async def test_get_offer_via_chat(client, chat_marian_egor):
    response = await client.get(f"/offers/offers/{chat_marian_egor}")
    assert response.status_code == 200
    assert response.json() == {
        "author_id": 1,
        "category": "technics",
        "chat_id": None,
        "city": "warsaw",
        "country": "poland",
        "cover_image": "http://phoqer.com/mediafiles/"
        "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
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
        "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
        "pub_date": "2021-05-21",
        "rental_period": "DAY",
        "status": "ACTIVE",
        "sub_category": "consoles",
        "title": "SONY PlayStation 4",
        "views": 1,
    }


async def test_offer_via_chat_404(client):
    response = await client.get("offers/offers/21/")
    assert response.status_code == 404


async def test_is_favorite_user_with_favorite(
    client, egor_auth_token, offer_ps4, offer_ps4_is_favorite
):
    response = await client.get(f"/offers/{offer_ps4}", headers=egor_auth_token)
    assert response.status_code == 200
    assert response.json()["is_favorite"] is True


async def test_is_favorite_user_with_no_favorite(
    client, offer_iphone12, marian_auth_token
):
    response = await client.get(f"/offers/{offer_iphone12}", headers=marian_auth_token)
    assert response.status_code == 200
    assert response.json()["is_favorite"] is False


async def test_create_offer_draft(
    client, marian_auth_token, city_kiev, sub_category_consoles
):
    post_data = {
        "category": "technics",
        "city": city_kiev,
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
        ],
        "is_deliverable": True,
        "items_amount": 3,
        "max_rent_period": 10,
        "min_rent_period": 20,
        "price": 499,
        "sub_category": sub_category_consoles,
        "title": "Iphone 12",
    }
    response = await client.post("/offers", json=post_data, headers=marian_auth_token)
    assert response.status_code == 201
    offer_id = response.json()["id"]
    offer_data = dict(await crud.get_offer(offer_id))
    offer_data.pop("id")
    offer_data.pop("pub_date")
    assert offer_data == {
        "author_id": 1,
        "category": "technics",
        "city": city_kiev,
        "country": "poland",
        "cover_image": "https://example.com/iphone.jpeg",
        "currency": "UAH",
        "deposit_val": 666,
        "description": "New Phone",
        "doc_needed": True,
        "extra_requirements": "text exta req",
        "first_name": "Marian",
        "is_deliverable": True,
        "items_amount": 3,
        "last_name": "Zozulia",
        "max_rent_period": 10,
        "min_rent_period": 20,
        "price": 499,
        "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
        "promote_til_date": None,
        "rental_period": "DAY",
        "status": "DRAFT",
        "sub_category": sub_category_consoles,
        "title": "Iphone 12",
        "views": 0,
    }


async def test_create_offer_not_authed(client):
    post_data = {}
    response = await client.post(
        "/offers",
        json=post_data,
    )
    assert response.status_code == 401


async def test_get_my_offers_not_authed(client):
    response = await client.get("/offers/status/all")
    assert response.status_code == 401


async def test_get_my_offers(client, marian_auth_token):
    response = await client.get("/offers/status/all", headers=marian_auth_token)
    assert response.status_code == 200
    assert response.json() == {
        "data": [],
        "total": 0,
    }


async def test_change_status(client, marian_auth_token, offer_ps4):
    # initial offer status in this fixture is ACTIVE
    data = {"status": "DRAFT"}
    response = await client.patch(
        f"/offers/status/{offer_ps4}",
        json=data,
        headers=marian_auth_token,
    )
    assert response.status_code == 204

    data = {"status": "REVIEW"}
    response = await client.patch(
        f"/offers/status/{offer_ps4}",
        json=data,
        headers=marian_auth_token,
    )
    assert response.status_code == 204
    offer = await crud.get_offer(offer_ps4)
    assert offer["status"] == "ACTIVE"

    data = {"status": "INACTIVE"}
    response = await client.patch(
        f"/offers/status/{offer_ps4}",
        json=data,
        headers=marian_auth_token,
    )
    assert response.status_code == 204

    data = {"status": "ARCHIVED"}
    response = await client.patch(
        f"/offers/status/{offer_ps4}",
        json=data,
        headers=marian_auth_token,
    )
    assert response.status_code == 204


# @pytest.mark.asyncio
# async def test_update_offer_country(client, auth_token):
#     post_data = {"country": "ukraine"}
#     async with AsyncClient(app=app, base_url="http://test") as ac:
#         response = await ac.patch(
#             "offers/412498ef-4a3e-4ad3-9af0-e8dcc513c92a",
#             json=post_data,
#             headers=auth_token,
#         )
#
#     assert response.status_code == 204
#     db_response = await get_offer("412498ef-4a3e-4ad3-9af0-e8dcc513c92a")
#     assert db_response.get("country") == "ukraine"


async def test_search(client, marian_auth_token, offer_ps4, offer_iphone12):
    response = await client.get(
        "/offers/search?rental_period=DAY", headers=marian_auth_token
    )
    assert response.status_code == 200
    assert response.json() == {
        "data": [
            {
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
                "currency": "PLN",
                "description": "Konsola Sony PlayStation 4 Nowa!",
                "id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224000",
                "is_deliverable": True,
                "is_favorite": False,
                "is_promoted": True,
                "price": 100,
                "pub_date": "2021-05-21",
                "rental_period": "DAY",
                "title": "SONY PlayStation 4",
                "user_id": 1,
                "views": 1,
            },
            {
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2369.png",
                "currency": "PLN",
                "description": "Nowy Iphone 12!",
                "id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224001",
                "is_deliverable": True,
                "is_favorite": False,
                "is_promoted": True,
                "price": 200,
                "pub_date": "2021-05-21",
                "rental_period": "DAY",
                "title": "Iphone 12",
                "user_id": 2,
                "views": 1101,
            },
        ],
        "total": 1,
    }


#
#
# async def test_delete_offer(client, marian_auth_token, offer_ps4):
#     response = await client.delete(
#         f"/offers/{offer_ps4}", headers=marian_auth_token
#     )
#     assert response.status_code == 204


async def test_get_popular_offers(client, offer_ps4):
    response = await client.get("/offers/popular")
    assert response.status_code == 200
    assert response.json() == [
        {
            "cover_image": "http://phoqer.com/mediafiles/"
            "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
            "currency": "PLN",
            "description": "Konsola Sony PlayStation 4 Nowa!",
            "id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224000",
            "is_deliverable": True,
            "is_favorite": False,
            "is_promoted": True,
            "price": 100,
            "pub_date": "2021-05-21",
            "rental_period": "DAY",
            "title": "SONY PlayStation 4",
            "user_id": 1,
            "views": 1,
        }
    ]


async def test_get_chat_by_offer(client, egor_auth_token, offer_ps4, chat_marian_egor):
    response = await client.get(f"/offers/{offer_ps4}/chat", headers=egor_auth_token)
    assert response.status_code == 200
    assert response.json() == chat_marian_egor


async def test_get_my_offers_by_status_all(client, marian_auth_token, offer_ps4):
    response = await client.get(f"/offers/status/all", headers=marian_auth_token)
    assert response.status_code == 200
    assert response.json() == {
        "total": 1,
        "data": [
            {
                "cover_image": "http://phoqer.com/mediafiles/52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
                "currency": "PLN",
                "description": "Konsola Sony PlayStation 4 Nowa!",
                "functions": ["ARCHIVE", "PROMOTE", "EDIT"],
                "id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224000",
                "is_deliverable": True,
                "is_promoted": True,
                "price": 100,
                "pub_date": "2021-05-21",
                "rental_period": "DAY",
                "title": "SONY PlayStation 4",
                "user_id": 1,
                "views": 1,
            }
        ],
    }
