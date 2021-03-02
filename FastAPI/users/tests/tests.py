from fastapi import status


def test_user_signup(client):
    post_data = {
        "password": "i_am_hungry",
        "email": "marian@gmail.com",
        "first_name": "Marian",
        "second_name": "Zozulia"
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
        "second_name": "Zozulia"
    }
    response = client.post(
        "users/signup",
        json=post_data,
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
