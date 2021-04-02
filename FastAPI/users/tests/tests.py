from fastapi import status


def test_user_signup(client):
    post_data = {
        "password": "i_am_hungry",
        "email": "marian.zozulia@gmail.com",
        "first_name": "Marian",
        "last_name": "Zozulia",
    }
    response = client.post(
        "users/signup",
        json=post_data,
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_user_already_exist(client):
    post_data = {
        "password": "kitty",
        "email": "marian.zozulia@gmail.com",
        "first_name": "Marian",
        "last_name": "Zozulia",
    }
    response = client.post(
        "users/signup",
        json=post_data,
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST


def test_logged_in_user_details(client, auth_token):
    r = client.get("users/me", headers=auth_token)
    assert r.status_code == status.HTTP_200_OK
    assert r.json() == {
        "bio": "lol kek cheburek",
        "birth_date": "2021-03-01",
        "communication_rate": 0,
        "date_joined": "2021-03-08T00:00:00+00:00",
        "description_rate": 0,
        "dislikes": 0,
        "email": "marian.zozulia@gmail.com",
        "first_name": "Marian",
        "id": 15,
        "last_name": "Zozulia",
        "likes": 0,
        "location": "Warsaw",
        "profile_img": "https://example.com/dic_pic.jpeg",
        "response_rate": 0,
        "satisfaction_rate": 0,
    }


def test_get_user_details(client):
    r = client.get("users/15")
    assert r.status_code == status.HTTP_200_OK
    assert r.json() == {
        "bio": "lol kek cheburek",
        "birth_date": "2021-03-01",
        "communication_rate": 0,
        "date_joined": "2021-03-08",
        "description_rate": 0,
        "dislikes": 0,
        "email": "marian.zozulia@gmail.com",
        "first_name": "Marian",
        "id": 15,
        "last_name": "Zozulia",
        "likes": 0,
        "location": "Warsaw",
        "profile_img": "https://example.com/dic_pic.jpeg",
        "response_rate": 0,
        "satisfaction_rate": 0,
        "last_activity": "2021-03-08T00:00:00+00:00",
    }


def test_get_short_user_details(client):
    r = client.get("users/short/15")
    assert r.status_code == status.HTTP_200_OK
    assert r.json() == {
        "date_joined": "2021-03-08",
        "first_name": "Marian",
        "id": 15,
        "last_activity": "2021-03-08T00:00:00+00:00",
        "last_name": "Zozulia",
        "location": "Warsaw",
        "profile_img": "https://example.com/dic_pic.jpeg",
    }
