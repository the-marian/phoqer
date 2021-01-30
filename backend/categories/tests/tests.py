from rest_framework import status

from categories.models import ParentCategories
from categories.tests.mocks import (
    categories_endpoint_url,
    list_categories_expected_response,
    list_categories_ordered_by_priority,
    list_categories_without_toys,
)


def test_list_categories(api_client, _db_test_data):
    response = api_client.get(categories_endpoint_url)
    assert response.status_code, status.HTTP_200_OK
    assert response.json() == list_categories_expected_response


def test_is_active(api_client, _db_test_data):
    response = api_client.get(categories_endpoint_url)
    assert response.json() == list_categories_expected_response

    toys = ParentCategories.objects.get(name='Toys')
    toys.is_active = False
    toys.save()

    response = api_client.get(categories_endpoint_url)
    assert response.json() == list_categories_without_toys


def test_priority(api_client, _db_test_data):
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
