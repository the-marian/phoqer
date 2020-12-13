from rest_framework import status
from freezegun import freeze_time


@freeze_time("2020-12-04")
def test_list_notifications_for_user_1(api_client, test_user_1, db_test_data):
    response = test_user_1.get('/api/v1/notifications/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [{"recipient": "maric0naric@gmail.com", "body": "some text"}]


@freeze_time("2020-12-04")
def test_list_notifications_for_user_2(api_client, test_user_2, db_test_data):
    response = test_user_2.get('/api/v1/notifications/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [{"recipient": "qwerty12345@gmail.com", "body": "some cool text"}]
