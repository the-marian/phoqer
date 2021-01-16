from rest_framework import status


def test_list_notifications_for_user_1(api_client, authenticated_user1, notification_1):
    response = authenticated_user1.get('/api/v1/notifications/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {
            "id": 1,
            "recipient": "maric0naric@gmail.com",
            "body": "some text",
            "pub_date": "2020-10-14 12:00:01",
            "viewed": True
        }
    ]


def test_list_notifications_for_user_2(api_client, authenticated_user2, notification_2):
    response = authenticated_user2.get('/api/v1/notifications/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {
            "id": 1,
            "recipient": "qwerty12345@gmail.com",
            "body": "some cool text",
            "pub_date": "2020-10-14 12:00:01",
            "viewed": False
        }
    ]


def test_empty_list(api_client, authenticated_user3):
    response = authenticated_user3.get('/api/v1/notifications/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == []


def test_unauthorized(api_client):
    response = api_client.get('/api/v1/notifications/')
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
