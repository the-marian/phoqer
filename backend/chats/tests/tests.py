import pytest
from fastapi import status
from freezegun import freeze_time
from httpx import AsyncClient

from main import app

from config import TECH_RENT_REQUEST

pytestmark = pytest.mark.asyncio


def test_get_chats_not_auth(client):
    response = client.get("chats")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Not authenticated"}


def test_get_chats_i_am_author(
    client, marian_auth_token, chat_marian_egor, chat_egor_marian
):
    response = client.get("chats?i_am_author=true", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "chat_id": 2,
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2369.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_activity": "2020-07-07T11:35:14.330296+00:00",
                "recipient_last_name": "Leletsky",
                "title": "Iphone 12",
            }
        ],
        "total": 1,
    }


def test_get_chats_i_am_client(
    client, marian_auth_token, chat_marian_egor, chat_egor_marian
):
    response = client.get("chats?i_am_client=true", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "chat_id": 1,
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_activity": "2020-07-07T11:35:14.330296+00:00",
                "recipient_last_name": "Leletsky",
                "title": "SONY PlayStation 4",
            }
        ],
        "total": 1,
    }


def test_get_chats_with_no_query_params(
    client, marian_auth_token, chat_marian_egor, chat_egor_marian
):
    response = client.get("chats", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "chat_id": 2,
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2369.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_activity": "2020-07-07T11:35:14.330296+00:00",
                "recipient_last_name": "Leletsky",
                "title": "Iphone 12",
            },
            {
                "chat_id": 1,
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_activity": "2020-07-07T11:35:14.330296+00:00",
                "recipient_last_name": "Leletsky",
                "title": "SONY PlayStation 4",
            },
        ],
        "total": 1,
    }


def test_get_chats_search(client, marian_auth_token):
    response = client.get("chats?search=igor", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "total": 1,
        "data": [
            {
                "chat_id": 1,
                "recipient_id": 1,
                "recipient_first_name": "Igor",
                "recipient_last_name": "Mykhailychenko",
                "recipient_last_activity": "2021-03-10T00:00:00+00:00",
                "new_messages": 1,
                "cover_image": "http://example.com",
            },
        ],
    }


def test_get_chats_search_no_result(client, marian_auth_token, _messages):
    response = client.get("chats?search=igorigorigor", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"total": 0, "data": []}


def test_get_messages_no_permission(client, marian_auth_token):
    response = client.get("chats/2", headers=marian_auth_token)
    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.json() == {"detail": "The user does not have access to this chat"}


def test_get_messages_not_auth(client):
    response = client.get("chats/1")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Not authenticated"}


def test_get_messages_invalid_chat_id(client, marian_auth_token):
    response = client.get("chats/100000000", headers=marian_auth_token)
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Chat with id 100000000 does not exist"}


async def test_invalid_offer_id(client, marian_auth_token):
    post_data = {
        "chat_id": 3,
        "author_id": 1,
        "client_id": 2,
        "offer_id": "a30b8a1e-1c60-4bbc-ac3d-37df2d324022",
        "creation_datetime": "2021-10-18T12:16:59+00:00",
        "is_done": False
    }
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("chats", json=post_data, headers=marian_auth_token)
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {
        "detail": "Offer with id: a30b8a1e-1c60-4bbc-ac3d-37df2d324022 does not exist"
    }


def test_get_messages(client, marian_auth_token, _messages):
    response = client.get("chats/1", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "total": 2,
        "data": [
            {
                "creation_datetime": "2021-06-20T15:49:32.639425+00:00",
                "first_name": "Marian",
                "id": 49,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:48:32.639425+00:00",
                "first_name": "Egor",
                "id": 48,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:47:32.639425+00:00",
                "first_name": "Marian",
                "id": 47,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:46:32.639425+00:00",
                "first_name": "Egor",
                "id": 46,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:45:32.639425+00:00",
                "first_name": "Marian",
                "id": 45,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:44:32.639425+00:00",
                "first_name": "Egor",
                "id": 44,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:43:32.639425+00:00",
                "first_name": "Marian",
                "id": 43,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:42:32.639425+00:00",
                "first_name": "Egor",
                "id": 42,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:41:32.639425+00:00",
                "first_name": "Marian",
                "id": 41,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:40:32.639425+00:00",
                "first_name": "Egor",
                "id": 40,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:39:32.639425+00:00",
                "first_name": "Marian",
                "id": 39,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:38:32.639425+00:00",
                "first_name": "Egor",
                "id": 38,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:37:32.639425+00:00",
                "first_name": "Marian",
                "id": 37,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:36:32.639425+00:00",
                "first_name": "Egor",
                "id": 36,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:35:32.639425+00:00",
                "first_name": "Marian",
                "id": 35,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:34:32.639425+00:00",
                "first_name": "Egor",
                "id": 34,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:33:32.639425+00:00",
                "first_name": "Marian",
                "id": 33,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:32:32.639425+00:00",
                "first_name": "Egor",
                "id": 32,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:31:32.639425+00:00",
                "first_name": "Marian",
                "id": 31,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:30:32.639425+00:00",
                "first_name": "Egor",
                "id": 30,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:29:32.639425+00:00",
                "first_name": "Marian",
                "id": 29,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:28:32.639425+00:00",
                "first_name": "Egor",
                "id": 28,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:27:32.639425+00:00",
                "first_name": "Marian",
                "id": 27,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:26:32.639425+00:00",
                "first_name": "Egor",
                "id": 26,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:25:32.639425+00:00",
                "first_name": "Marian",
                "id": 25,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:24:32.639425+00:00",
                "first_name": "Egor",
                "id": 24,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:23:32.639425+00:00",
                "first_name": "Marian",
                "id": 23,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:22:32.639425+00:00",
                "first_name": "Egor",
                "id": 22,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:21:32.639425+00:00",
                "first_name": "Marian",
                "id": 21,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:20:32.639425+00:00",
                "first_name": "Egor",
                "id": 20,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
        ],
    }


def test_get_messages_page_2(client, marian_auth_token, _messages):
    response = client.get("chats/1?page=2", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "creation_datetime": "2021-06-20T15:19:32.639425+00:00",
                "first_name": "Marian",
                "id": 19,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:18:32.639425+00:00",
                "first_name": "Egor",
                "id": 18,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:17:32.639425+00:00",
                "first_name": "Marian",
                "id": 17,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:16:32.639425+00:00",
                "first_name": "Egor",
                "id": 16,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:15:32.639425+00:00",
                "first_name": "Marian",
                "id": 15,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:14:32.639425+00:00",
                "first_name": "Egor",
                "id": 14,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:13:32.639425+00:00",
                "first_name": "Marian",
                "id": 13,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:12:32.639425+00:00",
                "first_name": "Egor",
                "id": 12,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:11:32.639425+00:00",
                "first_name": "Marian",
                "id": 11,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:10:32.639425+00:00",
                "first_name": "Egor",
                "id": 10,
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:01:32.639425+00:00",
                "first_name": "Marian",
                "id": 1,
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "RENT_REQUEST",
                "profile_img": "http://phoqer.com/mediafiles/"
                "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
        ],
        "total": 2,
    }


@freeze_time("2021-07-25 14:52:12")
def test_create_chat(db, client, marian_auth_token, offer_ps4):
    post_data = {
        "offer_id": offer_ps4,
    }
    response = client.post("chats", json=post_data, headers=marian_auth_token)
    assert response.status_code == 201
    assert response.json() == {"id": 1}

    response = client.get("chats", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "total": 1,
        "data": [
            {
                "chat_id": 1,
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
                "new_messages": 0,
                "recipient_first_name": "Marian",
                "recipient_id": 1,
                "recipient_last_activity": "2021-07-25T12:52:12+00:00",
                "recipient_last_name": "Zozulia",
                "title": "SONY PlayStation 4",
            }
        ],
    }
    db.execute("SELECT id, message_type, text FROM messages WHERE chat_id = 1")
    message = db.fetchone()
    assert message[0] == 1
    assert message[1] == "RENT_REQUEST"
    assert message[2] == TECH_RENT_REQUEST


def test_archived_chats(client, marian_auth_token, chat_marian_egor):
    response = client.get("chats?is_done=false", headers=marian_auth_token)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "data": [
            {
                "chat_id": 1,
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_activity": "2020-07-07T11:35:14.330296+00:00",
                "recipient_last_name": "Leletsky",
                "title": "SONY PlayStation 4",
            }
        ],
        "total": 1,
    }
    response = client.get("chats?is_done=true", headers=marian_auth_token)
    assert response.json() == {"data": [], "total": 0}


def test_archived_chats_bad_query(client, marian_auth_token):
    response = client.get("chats?is_done=wtf", headers=marian_auth_token)
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    assert response.json() == {
        "detail": [
            {
                "loc": ["query", "is_done"],
                "msg": "value could not be parsed to a boolean",
                "type": "type_error.bool",
            }
        ]
    }
