import pytest
from fastapi import status

pytestmark = pytest.mark.asyncio


async def test_get_notification1(client, marian_auth_token, offer_ps4, notification1):
    response = await client.get("/notifications?page=1", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "body": "Start of the rent",
                "id": 1,
                "notification_type": "RENT_START",
                "pub_date": "2021-10-18T12:16:59+00:00",
                "offer_id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224000",
                "recipient_id": 1,
                "viewed": False,
            },
        ],
        "total": 1,
    }


async def test_get_notification2(client, egor_auth_token, offer_iphone12, notification2):
    response = await client.get("/notifications", headers=egor_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "body": "End of the rent",
                "id": 2,
                "notification_type": "RENT_END",
                "pub_date": "2021-10-20T10:16:00+00:00",
                "offer_id": "a30b8a1e-1c60-4bbc-ac3d-37df2d224001",
                "recipient_id": 2,
                "viewed": True,
            },
        ],
        "total": 1,
    }


async def test_pagination(client, marian_auth_token):
    response = await client.get("/notifications?page=2", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {'data': [], 'total': 0}
