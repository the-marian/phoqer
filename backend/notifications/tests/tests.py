import pytest
from fastapi import status

pytestmark = pytest.mark.asyncio


async def test_get_notification1(client, marian_auth_token, notification1):
    response = await client.get("/notifications?page=1", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "body": "Start of the rent",
                "first_name": "Marian",
                "id": 1,
                "last_name": "Zozulia",
                "notification_type": "RENT_START",
                "offer_id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224000",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "pub_date": "2021-10-18T12:16:59+00:00",
                "recipient_id": 1,
                "title": "SONY PlayStation 4",
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
                "body": "End of the rent",
                "first_name": "Egor",
                "id": 2,
                "last_name": "Leletsky",
                "notification_type": "RENT_END",
                "offer_id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224001",
                "profile_img": None,
                "pub_date": "2021-10-20T10:16:00+00:00",
                "recipient_id": 2,
                "title": "Iphone 12",
                "viewed": True,
            },
        ],
        "total": 1,
    }
