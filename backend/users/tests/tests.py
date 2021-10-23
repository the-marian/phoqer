import datetime

import pytest
from fastapi import status

from users.crud import get_user

# decorate all tests with @pytest.mark.asyncio
pytestmark = pytest.mark.asyncio
#
# def test_user_signup(client):
#     post_data = {
#         "password": "i_am_hungry",
#         "email": "maric0naric@gmail.com",
#         "first_name": "Marian",
#         "last_name": "Zozulia",
#     }
#     response = client.post(
#         "users/signup",
#         json=post_data,
#     )
#     assert response.status_code == status.HTTP_204_NO_CONTENT
#
#
# def test_user_already_exist(client):
#     post_data = {
#         "password": "kitty",
#         "email": "marian.zozulia@gmail.com",
#         "first_name": "Marian",
#         "last_name": "Zozulia",
#     }
#     response = client.post(
#         "users/signup",
#         json=post_data,
#     )
#     assert response.status_code == status.HTTP_400_BAD_REQUEST
#
#
# def test_logged_in_user_details(client, marian_auth_token):
#     r = client.get("users/me", headers=marian_auth_token)
#     assert r.status_code == status.HTTP_200_OK
#     assert r.json() == {
#         "bio": "new bio",
#         "birth_date": "1997-11-06",
#         "city": "warsaw",
#         "communication_rate": 0,
#         "country": "poland",
#         "date_joined": "2021-03-09",
#         "description_rate": 0,
#         "dislikes": 0,
#         "email": "marian.zozulia@gmail.com",
#         "first_name": "Marian",
#         "id": 2,
#         "last_activity": "2021-03-09T00:00:00+00:00",
#         "last_name": "Zozulia",
#         "likes": 0,
#         "profile_img": "https://example.com/dic_pic_2.jpeg",
#         "response_rate": 0,
#         "satisfaction_rate": 0,
#     }
#
#
# def test_get_user_details(client):
#     r = client.get("users/2")
#     assert r.status_code == status.HTTP_200_OK
#     assert r.json() == {
#         "bio": "new bio",
#         "birth_date": "1997-11-06",
#         "city": "warsaw",
#         "communication_rate": 0,
#         "country": "poland",
#         "date_joined": "2021-03-09",
#         "description_rate": 0,
#         "dislikes": 0,
#         "email": "marian.zozulia@gmail.com",
#         "first_name": "Marian",
#         "id": 2,
#         "last_activity": "2021-03-09T00:00:00+00:00",
#         "last_name": "Zozulia",
#         "likes": 0,
#         "profile_img": "https://example.com/dic_pic_2.jpeg",
#         "response_rate": 0,
#         "satisfaction_rate": 0,
#     }
#
#
# def test_get_short_user_details(client):
#     r = client.get("users/short/2")
#     assert r.status_code == status.HTTP_200_OK
#     assert r.json() == {
#         "city": "warsaw",
#         "country": "poland",
#         "date_joined": "2021-03-09",
#         "first_name": "Marian",
#         "id": 2,
#         "last_activity": "2021-03-09T00:00:00+00:00",
#         "last_name": "Zozulia",
#         "profile_img": "https://example.com/dic_pic_2.jpeg",
#     }
#
#
# async def test_partial_update_user(client, marian_auth_token):
#     patch_data = {
#         "bio": "new bio",
#         "birth_date": "1997-11-06",
#         "city": "warsaw",
#         "country": "poland",
#         "first_name": "Marian",
#         "last_name": "Zozulia",
#         "profile_img": "https://example.com/dic_pic_2.jpeg",
#     }
#     response = await client.patch("/users/me", json=patch_data, headers=marian_auth_token)
#     assert response.status_code == 204
#     db_response = await get_user(2)
#     assert db_response.get("bio") == "new bio"
#     assert db_response.get("birth_date") == datetime.date(1997, 11, 6)
#     assert db_response.get("city") == "warsaw"
#     assert db_response.get("country") == "poland"
#     assert db_response.get("first_name") == "Marian"
#     assert db_response.get("last_name") == "Zozulia"
#     assert db_response.get("profile_img") == "https://example.com/dic_pic_2.jpeg"
