import pytest

from categories.models import ChildCategories, ParentCategories
from categories.tests.mocks import books_img_url, sport_img_url, toys_img_url


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture
def db_test_data(db):
    sport = ParentCategories.objects.create(
        name='Sport',
        slug='sport',
        image=sport_img_url,
        is_active=True,
        priority=1
    )
    books = ParentCategories.objects.create(
        name='Books',
        slug='books',
        image=books_img_url,
        is_active=True,
        priority=2
    )
    toys = ParentCategories.objects.create(
        name='Toys',
        slug='toys',
        image=toys_img_url,
        is_active=True,
        priority=3
    )
    ChildCategories.objects.create(name='Bicycle', slug='bicycle', parent=sport)
    ChildCategories.objects.create(name='Jet Ski', slug='jet-ski', parent=sport)
    ChildCategories.objects.create(name='Bible', slug='bible', parent=books)
    ChildCategories.objects.create(name='Alphabet', slug='alphabet', parent=books)
    ChildCategories.objects.create(name='Yo-yo', slug='yo-yo', parent=toys)
    ChildCategories.objects.create(name='Chess', slug='chess', parent=toys)
