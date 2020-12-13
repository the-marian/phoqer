import pytest
from rest_framework.test import APIClient
from notifications.models import Notifications
from users.models import User


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


@pytest.fixture
def db_test_data(db):
    user_1 = User.objects.create_user(first_name='Marian', last_name='Zozulia', email='maric0naric@gmail.com',
                                      password='bla bla bla 123')
    user_2 = User.objects.create_user(first_name='Egor', last_name='Fray', email='qwerty12345@gmail.com',
                                      password='123erw')
    Notifications.objects.create(recipient=user_1, body='some text', viewed=True)
    Notifications.objects.create(recipient=user_2, body='some cool text', viewed=False)
