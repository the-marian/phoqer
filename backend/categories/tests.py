import pytest
from rest_framework import status

from .models import ParentCategories, ChildCategories

sport_img_url = 'https://example.com/sport.jpeg'
books_img_url = 'https://example.com/books.jpeg'
toys_img_url = 'https://example.com/toys.jpeg'
categories_endpoint_url = '/categories/'

list_categories_expected_response = [
    {
        'name': 'Sport',
        'slug': 'sport',
        'image': sport_img_url,
        'sub_categories': [
            {
                'name': 'Bicycle',
                'slug': 'bicycle',
            },
            {
                'name': 'Jet Ski',
                'slug': 'jet-ski',
            },
        ]
    },
    {
        'name': 'Books',
        'slug': 'books',
        'image': books_img_url,
        'sub_categories': [
            {
                'name': 'Bible',
                'slug': 'bible',
            },
            {
                'name': 'Alphabet',
                'slug': 'alphabet',
            },
        ]
    },
    {
        'name': 'Toys',
        'slug': 'toys',
        'image': toys_img_url,
        'sub_categories': [
            {
                'name': 'Yo-yo',
                'slug': 'yo-yo',
            },
            {
                'name': 'Chess',
                'slug': 'chess',
            },
        ]
    },
]

list_categories_without_toys = [
    {
        'name': 'Sport',
        'slug': 'sport',
        'image': sport_img_url,
        'sub_categories': [
            {
                'name': 'Bicycle',
                'slug': 'bicycle',
            },
            {
                'name': 'Jet Ski',
                'slug': 'jet-ski',
            },
        ]
    },
    {
        'name': 'Books',
        'slug': 'books',
        'image': books_img_url,
        'sub_categories': [
            {
                'name': 'Bible',
                'slug': 'bible',
            },
            {
                'name': 'Alphabet',
                'slug': 'alphabet',
            },
        ]
    },
]

list_categories_ordered_by_priority = [
    {
        'name': 'Toys',
        'slug': 'toys',
        'image': toys_img_url,
        'sub_categories': [
            {
                'name': 'Yo-yo',
                'slug': 'yo-yo',
            },
            {
                'name': 'Chess',
                'slug': 'chess',
            },
        ]
    },
    {
        'name': 'Books',
        'slug': 'books',
        'image': books_img_url,
        'sub_categories': [
            {
                'name': 'Bible',
                'slug': 'bible',
            },
            {
                'name': 'Alphabet',
                'slug': 'alphabet',
            },
        ]
    },
    {
        'name': 'Sport',
        'slug': 'sport',
        'image': sport_img_url,
        'sub_categories': [
            {
                'name': 'Bicycle',
                'slug': 'bicycle',
            },
            {
                'name': 'Jet Ski',
                'slug': 'jet-ski',
            },
        ]
    },
]


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture
def db_test_data():
    sport = ParentCategories.objects.create(name='Sport', slug='sport', image=sport_img_url, is_active=True,
                                            priority=1)
    books = ParentCategories.objects.create(name='Books', slug='books', image=books_img_url, is_active=True,
                                            priority=2)
    toys = ParentCategories.objects.create(name='Toys', slug='toys', image=toys_img_url, is_active=True,
                                           priority=3)
    ChildCategories.objects.create(name='Bicycle', slug='bicycle', parent=sport)
    ChildCategories.objects.create(name='Jet Ski', slug='jet-ski', parent=sport)
    ChildCategories.objects.create(name='Bible', slug='bible', parent=books)
    ChildCategories.objects.create(name='Alphabet', slug='alphabet', parent=books)
    ChildCategories.objects.create(name='Yo-yo', slug='yo-yo', parent=toys)
    ChildCategories.objects.create(name='Chess', slug='chess', parent=toys)


@pytest.mark.django_db
def test_list_categories(api_client, db_test_data):
    response = api_client.get(categories_endpoint_url)
    assert response.status_code, status.HTTP_200_OK
    assert response.json() == list_categories_expected_response


@pytest.mark.django_db
def test_is_active(api_client, db_test_data):
    response = api_client.get(categories_endpoint_url)
    assert response.json() == list_categories_expected_response

    toys = ParentCategories.objects.get(name='Toys')
    toys.is_active = False
    toys.save()

    response = api_client.get(categories_endpoint_url)
    assert response.json() == list_categories_without_toys


@pytest.mark.django_db
def test_priority(api_client, db_test_data):
    response = api_client.get(categories_endpoint_url)
    assert response.json() == list_categories_expected_response

    sport = ParentCategories.objects.get(name='Sport')
    sport.priority = 3
    sport.save()

    toys = ParentCategories.objects.get(name='Toys')
    toys.priority = 1
    toys.save()

    response = api_client.get(categories_endpoint_url)
    assert response.json() == list_categories_ordered_by_priority
