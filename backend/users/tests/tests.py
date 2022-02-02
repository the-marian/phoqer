import datetime

import pytest

from users.crud import get_user_by_id

pytestmark = pytest.mark.asyncio


async def test_user_signup(client):
    post_data = {
        "password": "i_am_hungry",
        "email": "test@phoqer.com",
        "first_name": "Marian",
        "last_name": "Zozulia",
    }
    response = await client.post(
        "/users/signup",
        json=post_data,
    )
    assert response.status_code == 204


async def test_user_already_exist(client, user_marian):
    post_data = {
        "password": "kitty",
        "email": "marian.zozulia@gmail.com",
        "first_name": "Marian",
        "last_name": "Zozulia",
    }
    response = await client.post(
        "/users/signup",
        json=post_data,
    )

    assert response.status_code == 400
    assert response.json() == {
        "detail": "The user with this username already exists in the system"
    }


async def test_logged_in_user_details(client, marian_auth_token):
    response = await client.get("/users/me", headers=marian_auth_token)
    assert response.status_code == 200
    response = response.json()
    response.pop("id")
    assert response == {
        "bio": "Made on Earth by humans... Currently hanging out in Warsaw",
        "birth_date": "1997-11-06",
        "city": "warsaw",
        "communication_rate": 0,
        "country": "poland",
        "date_joined": "2021-03-09",
        "description_rate": 0,
        "dislikes": 0,
        "email": "marian.zozulia@gmail.com",
        "first_name": "Marian",
        "last_activity": "2021-07-07T00:00:00+00:00",
        "last_name": "Zozulia",
        "likes": 0,
        "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
        "response_rate": 0,
        "satisfaction_rate": 0,
    }


async def test_get_user_details(client, user_marian):
    response = await client.get(f"/users/{user_marian}")
    assert response.status_code == 200
    response = response.json()
    response.pop("id")
    assert response == {
        "bio": "Made on Earth by humans... Currently hanging out in Warsaw",
        "birth_date": "1997-11-06",
        "city": "warsaw",
        "communication_rate": 0,
        "country": "poland",
        "date_joined": "2021-03-09",
        "description_rate": 0,
        "dislikes": 0,
        "email": "marian.zozulia@gmail.com",
        "first_name": "Marian",
        "last_activity": "2021-07-07T00:00:00+00:00",
        "last_name": "Zozulia",
        "likes": 0,
        "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
        "response_rate": 0,
        "satisfaction_rate": 0,
    }


async def test_get_short_user_details(client, user_marian):
    response = await client.get(f"/users/short/{user_marian}")
    assert response.status_code == 200
    response = response.json()
    response.pop("id")
    assert response == {
        "city": "warsaw",
        "country": "poland",
        "date_joined": "2021-03-09",
        "first_name": "Marian",
        "last_activity": "2021-07-07T00:00:00+00:00",
        "last_name": "Zozulia",
        "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
    }


async def test_partial_update_user(client, igor_auth_token, city_warsaw, user_igor):
    patch_data = {
        "bio": "new bio",
        "birth_date": "1997-11-06",
        "city": "warsaw",
        "country": "poland",
        "first_name": "Marian",
        "last_name": "Zozulia",
        "profile_img": "https://example.com/dic_pic_2.jpeg",
    }
    response = await client.patch("/users/me", json=patch_data, headers=igor_auth_token)
    assert response.status_code == 204
    db_response = dict(await get_user_by_id(user_igor))
    db_response.pop("id")
    assert db_response == {
        "bio": "new bio",
        "birth_date": datetime.date(1997, 11, 6),
        "city": "warsaw",
        "country": "poland",
        "date_joined": datetime.datetime(2019, 11, 9, 0, 0, tzinfo=datetime.timezone.utc),
        "email": "igorrr.thlw5@gmail.com",
        "first_name": "Marian",
        "last_activity": datetime.datetime(
            2021, 7, 7, 0, 0, tzinfo=datetime.timezone.utc
        ),
        "last_name": "Zozulia",
        "profile_img": "https://example.com/dic_pic_2.jpeg",
    }
