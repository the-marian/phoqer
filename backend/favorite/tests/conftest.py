import pytest
from freezegun import freeze_time

from categories.models import ChildCategories, ParentCategories
from offers.models import Offer
from users.models import User


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture
def author_1(db):
    return User.objects.create_user(
        first_name='Marian',
        last_name='Zozulia',
        email='maric0naric@gmail.com',
        password='bla bla bla 123'
    )


@pytest.fixture
def author_2(db):
    return User.objects.create_user(
        first_name='Egor',
        last_name='Fray',
        email='qwerty123@gmail.com',
        password='123'
    )


@pytest.fixture
def author_3(db):
    return User.objects.create_user(
        first_name='Igor',
        last_name='Michylechenko',
        email='jstop@gmail.com',
        password='jstop'
    )


@pytest.fixture
def authenticated_client_1(db, author_1):
    from rest_framework.test import APIClient
    client = APIClient()
    client.login(username='maric0naric@gmail.com', password='bla bla bla 123')
    return client


@pytest.fixture
def authenticated_client_2(db, author_2):
    from rest_framework.test import APIClient
    client = APIClient()
    client.login(username='qwerty123@gmail.com', password='123')
    return client


@pytest.fixture
def authenticated_client_3(db, author_3):
    from rest_framework.test import APIClient
    client = APIClient()
    client.login(username='jstop@gmail.com', password='jstop')
    return client


@pytest.fixture
def category_1(db):
    return ParentCategories.objects.create(
        name='Phones',
        slug='phones',
        image='https://example.com/phone.jpeg',
        is_active=True,
        priority=1
    )


@pytest.fixture
def category_2(db):
    return ParentCategories.objects.create(
        name='Tech',
        slug='tech',
        image='https://example.com/phone.jpeg',
        is_active=True,
        priority=1
    )


@pytest.fixture
def sub_category_1(db, category_1):
    return ChildCategories.objects.create(name='IPhones', slug='iphones', parent=category_1)


@pytest.fixture
def sub_category_2(db, category_2):
    return ChildCategories.objects.create(name='PS', slug='ps', parent=category_2)


@pytest.fixture
@freeze_time("2020-10-29")
def offer_1(db, author_1, category_1, sub_category_1):
    return Offer.objects.create(
        author=author_1,
        category=category_1,
        city='Kiev',
        cover_image='https://example.com/phone.jpeg',
        currency='UAH',
        description='New Phone',
        id='1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
        doc_needed=False,
        is_deliverable=True,
        price='499',
        status='ACTIVE',
        sub_category=sub_category_1,
        title='Iphone 12'
    )


@pytest.fixture
@freeze_time("2020-10-29")
def offer_2(db, author_2, category_2, sub_category_2):
    return Offer.objects.create(
        author=author_2,
        category=category_2,
        city='Kiev',
        cover_image='https://example.com/phone.jpeg',
        currency='UAH',
        description='New PS5',
        id='1b261f53-8e3b-4c14-abe6-5824c5d8b66b',
        doc_needed=False,
        is_deliverable=True,
        price='350',
        status='ACTIVE',
        sub_category=sub_category_2,
        title='PS5'
    )


@pytest.fixture()
def iphone_12_with_author_1(author_1, offer_1):
    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_12.favorite.add(author_1)
    iphone_12.save()


@pytest.fixture()
def iphone_12_and_ps5_with_author_2(author_2, offer_1, offer_2):
    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_12.favorite.add(author_2)
    iphone_12.save()

    ps5 = Offer.objects.get(title='PS5')
    ps5.favorite.add(author_2)
    ps5.save()
