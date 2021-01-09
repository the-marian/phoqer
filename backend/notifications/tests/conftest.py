import pytest
from rest_framework.test import APIClient
from notifications.models import Notifications
from users.models import User
from freezegun import freeze_time


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture()
def test_user_1(db_test_data):
    user = User.objects.get(email='maric0naric@gmail.com')
    client = APIClient()
    client.force_authenticate(user=user)
    return client


@pytest.fixture()
def test_user_2(db_test_data):
    user = User.objects.get(email='qwerty12345@gmail.com')
    client = APIClient()
    client.force_authenticate(user=user)
    return client


@pytest.fixture()
def test_user_3(db_test_data):
    user = User.objects.get(email='jstop@gmail.com')
    client = APIClient()
    client.force_authenticate(user=user)
    return client


@pytest.fixture
@freeze_time("2020-10-14 12:00:01")
def db_test_data(db):
    user_1 = User.objects.create_user(first_name='Marian', last_name='Zozulia', email='maric0naric@gmail.com',
                                      password='bla bla bla 123')
    user_2 = User.objects.create_user(first_name='Egor', last_name='Fray', email='qwerty12345@gmail.com',
                                      password='123erw')
    user_3 = User.objects.create_user(first_name='Igor', last_name='Michylechenko', email='jstop@gmail.com',
                                      password='jstop')
    Notifications.objects.create(recipient=user_1, body='some text', viewed=True)
    Notifications.objects.create(recipient=user_2, body='some cool text', viewed=False)
