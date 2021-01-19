import pytest
from freezegun import freeze_time
from rest_framework.test import APIClient

from notifications.models import Notification
from users.models import User


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture
def user_1(db):
    return User.objects.create_user(first_name='Marian', last_name='Zozulia', email='maric0naric@gmail.com',
                                    password='bla bla bla 123')


@pytest.fixture
def user_2(db):
    return User.objects.create_user(first_name='Egor', last_name='Fray', email='qwerty12345@gmail.com',
                                    password='123erw')


@pytest.fixture
def user_3(db):
    return User.objects.create_user(first_name='Igor', last_name='Michylechenko', email='jstop@gmail.com',
                                    password='jstop')


@pytest.fixture
def authenticated_user1(db, user_1):
    client = APIClient()
    client.login(username='maric0naric@gmail.com', password='bla bla bla 123')
    return client


@pytest.fixture
def authenticated_user2(db, user_2):
    client = APIClient()
    client.login(username='qwerty12345@gmail.com', password='123erw')
    return client


@pytest.fixture
def authenticated_user3(db, user_3):
    client = APIClient()
    client.login(username='jstop@gmail.com', password='jstop')
    return client


@pytest.fixture
@freeze_time("2020-10-14 12:00:01")
def notification_1(db, user_1):
    return Notification.objects.create(recipient=user_1, body='some text', viewed=True)


@pytest.fixture
@freeze_time("2020-10-14 12:00:01")
def notification_2(db, user_2):
    return Notification.objects.create(recipient=user_2, body='some cool text', viewed=False)
