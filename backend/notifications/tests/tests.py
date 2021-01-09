from rest_framework import status


def test_list_notifications_for_user_1(api_client, test_user_1, db_test_data):
    response = test_user_1.get('/api/v1/notifications/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [{"recipient": "maric0naric@gmail.com", "pub_date": "2020-10-14 12:00:01",
                                "body": "some text"}]


def test_list_notifications_for_user_2(api_client, test_user_2, db_test_data):
    response = test_user_2.get('/api/v1/notifications/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [{"recipient": "qwerty12345@gmail.com", "pub_date": "2020-10-14 12:00:01",
                                "body": "some cool text"}]


def test_empty_list(api_client, test_user_3, db_test_data):
    response = test_user_3.get('/api/v1/notifications/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == []


def test_unauthorized(api_client, db_test_data):
    response = api_client.get('/api/v1/notifications/')
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
