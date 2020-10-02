from rest_framework import status
from rest_framework.test import APITestCase

from .models import ParentCategories, ChildCategories

sport_img_url = 'https://example.com/sport.jpeg'
books_img_url = 'https://example.com/books.jpeg'
toys_img_url = 'https://example.com/toys.jpeg'
categories_endpoint_url = '/categories/'


class CategoriesTests(APITestCase):
    list_categories_expected_response = [
        {
            'name': 'Sport',
            'image': sport_img_url,
            'sub_categories': [
                {
                    'name': 'Bicycle'
                },
                {
                    'name': 'Jet Ski'
                },
            ]
        },
        {
            'name': 'Books',
            'image': books_img_url,
            'sub_categories': [
                {
                    'name': 'Bible'
                },
                {
                    'name': 'Alphabet'
                },
            ]
        },
        {
            'name': 'Toys',
            'image': toys_img_url,
            'sub_categories': [
                {
                    'name': 'Yo-yo'
                },
                {
                    'name': 'Chess'
                },
            ]
        },
    ]

    list_categories_without_toys = [
        {
            'name': 'Sport',
            'image': sport_img_url,
            'sub_categories': [
                {
                    'name': 'Bicycle'
                },
                {
                    'name': 'Jet Ski'
                },
            ]
        },
        {
            'name': 'Books',
            'image': books_img_url,
            'sub_categories': [
                {
                    'name': 'Bible'
                },
                {
                    'name': 'Alphabet'
                },
            ]
        },
    ]

    list_categories_ordered_by_priority = [
        {
            'name': 'Toys',
            'image': toys_img_url,
            'sub_categories': [
                {
                    'name': 'Yo-yo'
                },
                {
                    'name': 'Chess'
                },
            ]
        },
        {
            'name': 'Books',
            'image': books_img_url,
            'sub_categories': [
                {
                    'name': 'Bible'
                },
                {
                    'name': 'Alphabet'
                },
            ]
        },
        {
            'name': 'Sport',
            'image': sport_img_url,
            'sub_categories': [
                {
                    'name': 'Bicycle'
                },
                {
                    'name': 'Jet Ski'
                },
            ]
        },
    ]

    def setUp(self):
        sport = ParentCategories.objects.create(name='Sport', image=sport_img_url, is_active=True,
                                                priority=1)
        books = ParentCategories.objects.create(name='Books', image=books_img_url, is_active=True,
                                                priority=2)
        toys = ParentCategories.objects.create(name='Toys', image=toys_img_url, is_active=True,
                                               priority=3)
        ChildCategories.objects.create(name='Bicycle', parent=sport)
        ChildCategories.objects.create(name='Jet Ski', parent=sport)
        ChildCategories.objects.create(name='Bible', parent=books)
        ChildCategories.objects.create(name='Alphabet', parent=books)
        ChildCategories.objects.create(name='Yo-yo', parent=toys)
        ChildCategories.objects.create(name='Chess', parent=toys)

    def test_list_categories(self):
        response = self.client.get(categories_endpoint_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, self.list_categories_expected_response)

    def test_is_active(self):
        response = self.client.get(categories_endpoint_url)
        self.assertEqual(response.data, self.list_categories_expected_response)

        toys = ParentCategories.objects.get(name='Toys')
        toys.is_active = False
        toys.save()

        response = self.client.get(categories_endpoint_url)
        self.assertEqual(response.data, self.list_categories_without_toys)

    def test_priority(self):
        response = self.client.get(categories_endpoint_url)
        self.assertEqual(response.data, self.list_categories_expected_response)

        sport = ParentCategories.objects.get(name='Sport')
        sport.priority = 3
        sport.save()

        toys = ParentCategories.objects.get(name='Toys')
        toys.priority = 1
        toys.save()

        response = self.client.get(categories_endpoint_url)
        self.assertEqual(response.data, self.list_categories_ordered_by_priority)
