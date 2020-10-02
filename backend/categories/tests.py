from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from .models import ParentCategories
# Create your tests here.


class ParentCategoriesTests(APITestCase):
    def setUp(self):
        ParentCategories.objects.create(name="Music", is_active="True", priority="2")
        ParentCategories.objects.create(name="Books", is_active="True", priority="10")
        ParentCategories.objects.create(name="Toys", is_active="False", priority="7")

    def test_parent_categories_response(self):
        response = self.client.get(reverse('api-categories:parent-categories'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_priority(self):
        music = ParentCategories.objects.get(name="Music")
        books = ParentCategories.objects.get(name="Books")
        self.assertLess(music.priority, books.priority)

    def test_is_active(self):
        pass
