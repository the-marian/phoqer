import pytest
from freezegun import freeze_time
from offers.models import Offer
from categories.models import ParentCategories, ChildCategories
from offers.tests.mocks import image_iphone_url, phones_image_url
from users.models import User


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture
def user(db):
    return User.objects.create_user(first_name='Marian', last_name='Zozulia', email='maric0naric@gmail.com',
                                    password='bla bla bla 123')


@pytest.fixture
@freeze_time("2020-10-29")
def db_test_data(db):
    author = User.objects.create(email='qwerty@gmail.com')
    phones = ParentCategories.objects.create(name='Phones', slug='phones', image=phones_image_url, is_active=True,
                                             priority=1)
    iphones = ChildCategories.objects.create(name='IPhones', slug='iphones', parent=phones)

    Offer.objects.create(
        author=author,
        category=phones,
        city='Kiev',
        cover_image=image_iphone_url,
        currency='UAH',
        description='New Phone',
        id='1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
        doc_needed=False,
        is_deliverable=True,
        per='DAY',
        price='499',
        status='ACTIVE',
        sub_category=iphones,
        title='Iphone 12')
    Offer.objects.create(
        author=author,
        category=phones,
        city='Kiev',
        cover_image=image_iphone_url,
        currency='UAH',
        description='Old Phone',
        id='1b261f53-8e3b-4c14-abe6-5824c5d8b67d',
        doc_needed=False,
        is_deliverable=False,
        per='WEEK',
        price='399',
        status='ACTIVE',
        sub_category=iphones,
        title='Iphone 11')
    Offer.objects.create(
        author=author,
        category=phones,
        city='Kiev',
        cover_image=image_iphone_url,
        currency='UAH',
        description='Old piece of Phone',
        id='1b261f53-8e3b-4c14-abe6-5824c5d8b77e',
        doc_needed=False,
        is_deliverable=True,
        per='MONTH',
        price='299',
        status='IN_RENT',
        sub_category=iphones,
        title='Iphone 10')



@pytest.fixture
def sport_category(db):
    return ParentCategories.objects.create(name='Sport', slug='sport', image=phones_image_url, is_active=True,
                                             priority=2)
