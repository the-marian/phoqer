import pytest
from fastapi import status

pytestmark = pytest.mark.asyncio


async def test_get_notification1(client, marian_auth_token, notification1):
    response = await client.get("/notifications?page=1", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "recipient_first_name": "Egor",
                "id": 1,
                "recipient_last_name": "Leletsky",
                "notification_type": "RENT_REQUEST",
                "offer_id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224001",
                "recipient_avatar": None,
                "pub_date": "2021-10-18T12:16:59+00:00",
                "recipient_id": 1,
                "offer_title": "Iphone 12",
                "viewed": False,
            },
        ],
        "total": 1,
    }


async def test_get_notification2(client, egor_auth_token, notification2):
    response = await client.get("/notifications", headers=egor_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "recipient_first_name": "Marian",
                "id": 2,
                "recipient_last_name": "Zozulia",
                "notification_type": "RENT_END",
                "offer_id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224000",
                "recipient_avatar": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "pub_date": "2021-10-20T10:16:00+00:00",
                "recipient_id": 2,
                "offer_title": "SONY PlayStation 4",
                "viewed": True,
            },
        ],
        "total": 1,
    }


async def test_pagination(client, marian_auth_token):
    response = await client.get("/notifications?page=2", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"data": [], "total": 0}


async def test_delete_notification_1(client):
    """Case with no auth token in header"""
    response = await client.delete("/notifications/1")
    assert response.status_code == 401


async def test_delete_notification_2(client, marian_auth_token):
    """Delete notification that does not exist"""
    response = await client.delete("/notifications/1", headers=marian_auth_token)
    assert response.status_code == 404


async def test_delete_notification_3(client, marian_auth_token, notification1):
    response = await client.delete(
        f"/notifications/{notification1}", headers=marian_auth_token
    )
    assert response.status_code == 204


async def test_delete_notification_4(client, marian_auth_token, notification2):
    """Delete notification that does not belongs logged in user"""
    response = await client.delete(
        f"/notifications/{notification2}", headers=marian_auth_token
    )
    assert response.status_code == 403
