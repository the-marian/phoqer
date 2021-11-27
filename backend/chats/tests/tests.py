import datetime

import pytest
from freezegun import freeze_time

from chats import crud
from chats.crud import get_messages
from notifications.crud import get_notification, get_notifications
from notifications.schemas import NotificationType

pytestmark = pytest.mark.asyncio


async def test_get_chats_not_auth(client):
    response = await client.get("/chats")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


async def test_get_chats_i_am_author(
    client, marian_auth_token, chat_marian_egor, chat_egor_marian
):
    response = await client.get("/chats?i_am_author=true", headers=marian_auth_token)
    assert response.status_code == 200
    assert response.json() == {
        "data": [
            {
                "chat_id": 1,
                "status": "NEW",
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_activity": "2020-07-07T00:00:00+00:00",
                "recipient_last_name": "Leletsky",
                "title": "SONY PlayStation 4",
            }
        ],
        "total": 1,
    }


async def test_get_chats_i_am_user(
    client, marian_auth_token, chat_marian_egor, chat_egor_marian
):
    response = await client.get("/chats?i_am_client=true", headers=marian_auth_token)
    assert response.status_code == 200
    assert response.json() == {
        "data": [
            {
                "chat_id": 2,
                "status": "NEW",
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2369.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_activity": "2020-07-07T00:00:00+00:00",
                "recipient_last_name": "Leletsky",
                "title": "Iphone 12",
            }
        ],
        "total": 1,
    }


async def test_get_chats_with_no_query_params(
    client, marian_auth_token, chat_marian_egor, chat_egor_marian
):
    response = await client.get("/chats", headers=marian_auth_token)
    assert response.status_code == 200
    assert response.json() == {
        "data": [
            {
                "chat_id": 1,
                "status": "NEW",
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_activity": "2020-07-07T00:00:00+00:00",
                "recipient_last_name": "Leletsky",
                "title": "SONY PlayStation 4",
            },
            {
                "chat_id": 2,
                "status": "NEW",
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2369.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_activity": "2020-07-07T00:00:00+00:00",
                "recipient_last_name": "Leletsky",
                "title": "Iphone 12",
            },
        ],
        "total": 1,
    }


async def test_delete_chat_1(client):
    """Case with no auth token in header"""
    response = await client.delete("/chats/1")
    assert response.status_code == 401


async def test_delete_chat_2(client, marian_auth_token):
    """Delete chat that does not exist"""
    response = await client.delete("/chats/1", headers=marian_auth_token)
    assert response.status_code == 404


async def test_delete_chat_3(client, chat_marian_egor, marian_auth_token):
    response = await client.delete(
        f"/chats/{chat_marian_egor}", headers=marian_auth_token
    )
    assert response.status_code == 204
    # test side effects
    notification = await get_notification(notification_id=1)
    assert notification["notification_type"] == NotificationType.RENT_CANCELLED.value
    assert notification["recipient_id"] == 2


async def test_delete_chat_4(client, chat_egor_marian, marian_auth_token):
    response = await client.delete(
        f"/chats/{chat_egor_marian}", headers=marian_auth_token
    )
    assert response.status_code == 204


async def test_delete_chat_5(client, chat_egor_marian, igor_auth_token):
    """Delete chat that does not belongs to logged in user"""
    response = await client.delete(f"/chats/{chat_egor_marian}", headers=igor_auth_token)
    assert response.status_code == 403


async def test_create_chat_when_offer_does_not_exist(client, marian_auth_token):
    post_data = {
        "chat_id": 3,
        "author_id": 1,
        "client_id": 2,
        "offer_id": "a30b8a1e-1c60-4bbc-ac3d-37df2d324022",
        "creation_datetime": "2021-10-18T12:16:59+00:00",
        "is_done": False,
    }
    response = await client.post("/chats", json=post_data, headers=marian_auth_token)
    assert response.status_code == 404
    assert response.json() == {
        "detail": "Offer with id: a30b8a1e-1c60-4bbc-ac3d-37df2d324022 does not exist"
    }


async def test_change_status(client, egor_auth_token, chat_egor_marian):
    patch_data = {"status": "APPROVED"}
    response = await client.patch(
        f"/chats/{chat_egor_marian}", json=patch_data, headers=egor_auth_token
    )
    assert response.status_code == 204


async def test_change_status_1(client, egor_auth_token, chat_egor_marian):
    patch_data = {"status": "ARCHIVED"}
    response = await client.patch(
        f"/chats/{chat_egor_marian}", json=patch_data, headers=egor_auth_token
    )
    assert response.status_code == 403


@freeze_time("2021-07-25 14:52:12")
async def test_create_chat(client, marian_auth_token, offer_iphone12):
    post_data = {
        "offer_id": str(offer_iphone12),
    }
    response = await client.post("/chats", json=post_data, headers=marian_auth_token)
    assert response.status_code == 201
    created_chat_id = response.json()["id"]
    # check chat data in db
    assert created_chat_id == 1
    chat_data = dict(await crud.get_chat(created_chat_id))
    assert chat_data == {
        "author_id": 2,
        "chat_id": 1,
        "client_id": 1,
        "creation_datetime": datetime.datetime(
            2021, 7, 25, 14, 52, 12, tzinfo=datetime.timezone.utc
        ),
        "is_done": False,
        "offer_id": offer_iphone12,
        "status": "NEW",
    }
    # check whether notification was created
    notification = [dict(n) for n in await get_notifications(chat_data["author_id"])][0]
    notification.pop("id")
    assert notification == {
        "author_id": 2,
        "notification_type": "RENT_REQUEST",
        "offer_id": offer_iphone12,
        "offer_title": "Iphone 12",
        "pub_date": datetime.datetime(
            2021, 7, 25, 14, 52, 12, tzinfo=datetime.timezone.utc
        ),
        "recipient_avatar": None,
        "recipient_first_name": "Egor",
        "recipient_id": 2,
        "recipient_last_name": "Leletsky",
        "viewed": False,
    }
    # check whether first message was created
    message = (await get_messages(created_chat_id))[0]
    assert dict(message) == {
        "creation_datetime": datetime.datetime(
            2021, 7, 25, 14, 52, 12, tzinfo=datetime.timezone.utc
        ),
        "encrypted_text": "gAAAAABg_XqcM-NDoS8mDdWYrdJ-7zr5zjezCcOMwqjRDl4Dr-"
        "s1bSUyE8_zF3SWjFHOlvbaRN0yD7hSpD1QCLW2-fNP6PLhhg==",
        "first_name": "Egor",
        "id": 1,
        "is_red": False,
        "last_name": "Leletsky",
        "message_type": "RENT_REQUEST",
        "profile_img": None,
        "user_id": 2,
    }


async def test_get_chat(client, marian_auth_token, chat_marian_egor):
    response = await client.get(f"/chats/{chat_marian_egor}", headers=marian_auth_token)
    assert response.status_code == 200
    assert response.json() == {
        "chat_id": 1,
        "status": "NEW",
    }


async def test_get_chats_search(client, marian_auth_token, chat_egor_marian):
    response = await client.get("/chats?search=egor", headers=marian_auth_token)
    assert response.status_code == 200
    assert response.json() == {
        "data": [
            {
                "chat_id": 2,
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2369.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_activity": "2020-07-07T00:00:00+00:00",
                "recipient_last_name": "Leletsky",
                "status": "NEW",
                "title": "Iphone 12",
            }
        ],
        "total": 1,
    }


async def test_get_messages_no_permission(client, igor_auth_token, chat_egor_marian):
    response = await client.get("/chats/2/messages", headers=igor_auth_token)
    assert response.status_code == 403
    assert response.json() == {"detail": "The user does not have access to this chat"}


async def test_get_messages_not_auth(client):
    response = await client.get("/chats/1/messages")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


async def test_get_messages_chat_with_id_not_found(client, marian_auth_token):
    response = await client.get("/chats/100000000", headers=marian_auth_token)
    assert response.status_code == 404
    assert response.json() == {"detail": "Chat with id 100000000 does not exist"}


async def test_get_messages(client, marian_auth_token, _messages):
    response = await client.get("/chats/1/messages", headers=marian_auth_token)
    assert response.status_code == 200
    response = response.json()
    [chat.pop("id") for chat in response["data"]]
    assert response == {
        "data": [
            {
                "creation_datetime": "2021-06-20T15:49:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:48:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:47:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:46:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:45:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:44:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:43:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:42:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:41:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:40:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:39:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:38:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:37:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:36:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:35:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:34:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:33:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:32:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:31:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:30:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:29:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:28:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:27:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:26:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:25:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:24:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:23:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:22:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
            {
                "creation_datetime": "2021-06-20T15:21:32+00:00",
                "first_name": "Marian",
                "is_red": True,
                "last_name": "Zozulia",
                "message_type": "MESSAGE",
                "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
                "text": "test",
                "uploads": [],
                "user_id": 1,
            },
            {
                "creation_datetime": "2021-06-20T15:20:32+00:00",
                "first_name": "Egor",
                "is_red": True,
                "last_name": "Leletsky",
                "message_type": "MESSAGE",
                "profile_img": None,
                "text": "test",
                "uploads": [],
                "user_id": 2,
            },
        ],
        "total": 2,
    }
    #


async def test_get_messages_page_2(client, marian_auth_token, _messages):
    response = await client.get("/chats/1/messages?page=2", headers=marian_auth_token)
    assert response.status_code == 200
    response = response.json()["data"]
    [chat.pop("id") for chat in response]
    assert response == [
        {
            "creation_datetime": "2021-06-20T15:19:32+00:00",
            "first_name": "Marian",
            "is_red": True,
            "last_name": "Zozulia",
            "message_type": "MESSAGE",
            "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
            "text": "test",
            "uploads": [],
            "user_id": 1,
        },
        {
            "creation_datetime": "2021-06-20T15:18:32+00:00",
            "first_name": "Egor",
            "is_red": True,
            "last_name": "Leletsky",
            "message_type": "MESSAGE",
            "profile_img": None,
            "text": "test",
            "uploads": [],
            "user_id": 2,
        },
        {
            "creation_datetime": "2021-06-20T15:17:32+00:00",
            "first_name": "Marian",
            "is_red": True,
            "last_name": "Zozulia",
            "message_type": "MESSAGE",
            "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
            "text": "test",
            "uploads": [],
            "user_id": 1,
        },
        {
            "creation_datetime": "2021-06-20T15:16:32+00:00",
            "first_name": "Egor",
            "is_red": True,
            "last_name": "Leletsky",
            "message_type": "MESSAGE",
            "profile_img": None,
            "text": "test",
            "uploads": [],
            "user_id": 2,
        },
        {
            "creation_datetime": "2021-06-20T15:15:32+00:00",
            "first_name": "Marian",
            "is_red": True,
            "last_name": "Zozulia",
            "message_type": "MESSAGE",
            "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
            "text": "test",
            "uploads": [],
            "user_id": 1,
        },
        {
            "creation_datetime": "2021-06-20T15:14:32+00:00",
            "first_name": "Egor",
            "is_red": True,
            "last_name": "Leletsky",
            "message_type": "MESSAGE",
            "profile_img": None,
            "text": "test",
            "uploads": [],
            "user_id": 2,
        },
        {
            "creation_datetime": "2021-06-20T15:13:32+00:00",
            "first_name": "Marian",
            "is_red": True,
            "last_name": "Zozulia",
            "message_type": "MESSAGE",
            "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
            "text": "test",
            "uploads": [],
            "user_id": 1,
        },
        {
            "creation_datetime": "2021-06-20T15:12:32+00:00",
            "first_name": "Egor",
            "is_red": True,
            "last_name": "Leletsky",
            "message_type": "MESSAGE",
            "profile_img": None,
            "text": "test",
            "uploads": [],
            "user_id": 2,
        },
        {
            "creation_datetime": "2021-06-20T15:11:32+00:00",
            "first_name": "Marian",
            "is_red": True,
            "last_name": "Zozulia",
            "message_type": "MESSAGE",
            "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
            "text": "test",
            "uploads": [],
            "user_id": 1,
        },
        {
            "creation_datetime": "2021-06-20T15:10:32+00:00",
            "first_name": "Egor",
            "is_red": True,
            "last_name": "Leletsky",
            "message_type": "MESSAGE",
            "profile_img": None,
            "text": "test",
            "uploads": [],
            "user_id": 2,
        },
        {
            "creation_datetime": "2021-06-20T15:01:32+00:00",
            "first_name": "Marian",
            "is_red": True,
            "last_name": "Zozulia",
            "message_type": "RENT_REQUEST",
            "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",

            "text": "test",
            "uploads": [],
            "user_id": 1,
        },
    ]


async def test_archived_chats_bad_query(client, marian_auth_token):
    response = await client.get("/chats?is_done=wtf", headers=marian_auth_token)
    assert response.status_code == 422
    assert response.json() == {
        "detail": [
            {
                "loc": ["query", "is_done"],
                "msg": "value could not be parsed to a boolean",
                "type": "type_error.bool",
            }
        ]
    }


async def test_archived_chats(client, marian_auth_token, chat_marian_egor):
    response = await client.get("/chats?is_done=false", headers=marian_auth_token)
    # assert response.status_code == 200
    assert response.json() == {
        "data": [
            {
                "chat_id": 1,
                "cover_image": "http://phoqer.com/mediafiles/"
                "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
                "new_messages": 0,
                "recipient_first_name": "Egor",
                "recipient_id": 2,
                "recipient_last_name": "Leletsky",
                "recipient_last_activity": "2020-07-07T00:00:00+00:00",
                "status": "NEW",
                "title": "SONY PlayStation 4",
            }
        ],
        "total": 1,
    }
    response = await client.get("/chats?is_done=true", headers=marian_auth_token)
    assert response.json() == {"data": [], "total": 0}
