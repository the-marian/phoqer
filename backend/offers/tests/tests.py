import json
from datetime import datetime

import pytest
from freezegun import freeze_time
from rest_framework import status

from offers.models import Offer
from offers.tests.mocks import *


def test_list_offers(api_client, db_test_data):
    response = api_client.get(offers_endpoint_url)
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == list_offers_expected_response


def test_status(api_client, db_test_data):
    response = api_client.get(offers_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_10 = Offer.objects.get(title='Iphone 10')
    iphone_10.status = 'DRAFT'
    iphone_10.save()

    response = api_client.get(offers_endpoint_url)
    assert response.json() == list_offers_without_iphone10

    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_10 = Offer.objects.get(title='Iphone 10')
    iphone_12.status = 'REVIEW'
    iphone_11.status = 'REJECTED'
    iphone_10.status = 'FROZEN'
    iphone_12.save()
    iphone_11.save()
    iphone_10.save()

    response = api_client.get(offers_endpoint_url)
    assert response.json() == offers_empty_list


@freeze_time('2020-10-29')
def test_is_promoted(api_client, db_test_data):
    response = api_client.get(offers_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_11.promote_til_date = datetime.strptime('2020-10-30', '%Y-%m-%d')
    iphone_11.save()

    response = api_client.get(offers_endpoint_url)
    assert response.json() == iphone11_is_promoted_True

    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_11.promote_til_date = datetime.strptime('2020-10-20', '%Y-%m-%d')
    iphone_11.save()

    response = api_client.get(offers_endpoint_url)
    assert response.json() == iphone11_is_promoted_False


def test_is_deliverable(api_client, db_test_data):
    response = api_client.get(offers_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_11.is_deliverable = True
    iphone_11.save()

    response = api_client.get(offers_endpoint_url)
    assert response.data[1]['is_deliverable'] is True


def test_order_by_promotion(api_client, db_test_data):
    response = api_client.get(offers_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_10 = Offer.objects.get(title='Iphone 10')
    iphone_12.promote_til_date = '2021-10-31'
    iphone_11.promote_til_date = '2021-11-01'
    iphone_10.promote_til_date = '2021-11-02'
    iphone_12.save()
    iphone_11.save()
    iphone_10.save()

    response = api_client.get(offers_endpoint_url)
    assert response.json() == list_ordered_by_promotion


def test_order_by_views(api_client, db_test_data):
    response = api_client.get(offers_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_10 = Offer.objects.get(title='Iphone 10')
    iphone_12.views = '128'
    iphone_11.views = '1290'
    iphone_10.views = '376'
    iphone_12.save()
    iphone_11.save()
    iphone_10.save()

    response = api_client.get(offers_endpoint_url)
    assert response.json() == list_ordered_by_views


@freeze_time('2020-10-29')
def test_order_mixed(api_client, db_test_data):
    response = api_client.get(offers_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_10 = Offer.objects.get(title='Iphone 10')
    iphone_12.promote_til_date = '2021-10-30'
    iphone_11.promote_til_date = '2021-10-31'
    iphone_10.promote_til_date = '2021-11-01'
    iphone_12.views = '238'
    iphone_11.views = '674'
    iphone_10.views = '257'
    iphone_12.save()
    iphone_11.save()
    iphone_10.save()

    response = api_client.get(offers_endpoint_url)
    assert response.json() == list_order_mixed


def test_is_favorite(api_client, user, db_test_data):
    response = api_client.get(popular_url_with_user_in_query)
    assert response.json() == list_offers_expected_response

    iphone_10 = Offer.objects.get(title='Iphone 10')
    iphone_10.favorite.add(user)
    iphone_10.save()

    response = api_client.get(popular_url_with_user_in_query)
    assert response.data[2]['is_favorite'] is False


def test_is_favorite_false(authed_api_client, db_test_data):
    response = authed_api_client.get('/api/v1/offers/popular/')
    assert response.data[2]['is_favorite'] is False


def test_search(api_client, db_test_data, sport_category):
    response = api_client.get(search_endpoint_url)
    assert response.json() == list_offers_expected_response
    # CATEGORY_TEST
    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_12.category = sport_category
    iphone_12.save()

    response = api_client.get(search_filter_category)
    assert response.data
    # SUB_CATEGORY_TEST
    response = api_client.get(search_filter_sub_category)
    assert response.json() == list_offers_expected_response
    # CITY_TEST
    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_12.city = 'Odessa'
    iphone_12.save()

    response = api_client.get(search_filter_city)
    assert response.json() == search_filter_city_mock
    # STATUS_TEST
    # active
    response = api_client.get(search_filter_status_active)
    assert response.json() == search_filter_status_active_mock
    # in rent
    response = api_client.get(search_filter_status_in_rent)
    assert response.json() == search_filter_status_in_rent_mock
    # IS_DELIVERABLE_TEST
    response = api_client.get(search_filter_is_deliverable)
    assert response.json() == search_filter_is_deliverable_mock
    # SEARCH_TEST
    # title
    response = api_client.get(search_test_title)
    assert response.json() == list_offers_expected_response
    # description
    response = api_client.get(search_test_description)
    assert response.json() == search_test_description_mock


def test_ascending_price_ordering(api_client, db_test_data):
    response = api_client.get(search_endpoint_url)
    assert response.json() == list_offers_expected_response

    response = api_client.get(ascending_price_ordering)
    assert response.json() == ascending_price_ordering_mock


def test_descending_price_ordering(api_client, db_test_data):
    response = api_client.get(search_endpoint_url)
    assert response.json() == list_offers_expected_response

    response = api_client.get(descending_price_ordering)
    assert response.json() == list_offers_expected_response


def test_ascending_deposit_val(api_client, db_test_data):
    response = api_client.get(search_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_10 = Offer.objects.get(title='Iphone 10')
    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_12 = Offer.objects.get(title='Iphone 12')

    iphone_10.deposit_val = 109
    iphone_11.deposit_val = 500
    iphone_12.deposit_val = 300

    iphone_10.save()
    iphone_11.save()
    iphone_12.save()

    response = api_client.get(ascending_deposit_ordering)
    assert response.json() == ascending_deposit_ordering_mock


def test_descending_deposit_val(api_client, db_test_data):
    response = api_client.get(search_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_10 = Offer.objects.get(title='Iphone 10')
    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_12 = Offer.objects.get(title='Iphone 12')

    iphone_10.deposit_val = 109
    iphone_11.deposit_val = 500
    iphone_12.deposit_val = 300

    iphone_10.save()
    iphone_11.save()
    iphone_12.save()

    response = api_client.get(descending_deposit_ordering)
    assert response.json() == descending_deposit_ordering_mock


def test_min_price_order(api_client, db_test_data):
    response = api_client.get(search_endpoint_url)
    assert response.json() == list_offers_expected_response

    response = api_client.get(min_price_order)
    assert response.json() == min_price_order_mock


def test_max_price_order(api_client, db_test_data):
    response = api_client.get(search_endpoint_url)
    assert response.json() == list_offers_expected_response

    response = api_client.get(max_price_order)
    assert response.json() == max_price_order_mock


def test_no_deposit(api_client, db_test_data):
    response = api_client.get(search_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_11.deposit_val = 200
    iphone_11.save()

    response = api_client.get(no_deposit_true)
    assert response.json() == no_deposit_true_mock


def test_max_deposit(api_client, db_test_data):
    response = api_client.get(search_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_10 = Offer.objects.get(title='Iphone 10')
    iphone_12.deposit_val = 100
    iphone_11.deposit_val = 200
    iphone_10.deposit_val = 400
    iphone_12.save()
    iphone_11.save()
    iphone_10.save()

    response = api_client.get(max_deposit_filter)
    assert response.json() == max_deposit_filter_mock


def test_min_deposit(api_client, db_test_data):
    response = api_client.get(search_endpoint_url)
    assert response.json() == list_offers_expected_response

    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_11 = Offer.objects.get(title='Iphone 11')
    iphone_10 = Offer.objects.get(title='Iphone 10')
    iphone_12.deposit_val = 100
    iphone_11.deposit_val = 200
    iphone_10.deposit_val = 400
    iphone_12.save()
    iphone_11.save()
    iphone_10.save()

    response = api_client.get(min_deposit_filter)
    assert response.json() == min_deposit_filter_mock


def test_offer_detail_view(api_client, db_test_data):
    response = api_client.get('/api/v1/offers/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.json() == {
        'category': 'phones',
        'city': 'Kiev',
        'cover_image': 'https://example.com/iphone.jpeg',
        'currency': 'UAH',
        'deposit_val': 0,
        'description': 'New Phone',
        'doc_needed': False,
        'extra_requirements': None,
        'id': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
        'images': [],
        'is_deliverable': True,
        'is_favorite': False,
        'is_promoted': False,
        'max_rent_period': None,
        'min_rent_period': None,
        'price': 499,
        'pub_date': '2020-10-29',
        'sub_category': 'iphones',
        'title': 'Iphone 12',
        'views': 0,
    }


def test_offer_not_auth_update(api_client, db_test_data):
    data = {'price': 111}
    response = api_client.patch('/api/v1/offers/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/', data)
    assert response.status_code == 401


@pytest.mark.parametrize(
    'update_field,update_date',
    [
        ('price', 111),
        ('max_rent_period', 111),
        ('category', 'sport'),
        ('city', 'Warsaw'),
        ('cover_image', 'https://example.com/dic_pic.jpg'),
        ('currency', 'USD'),
        ('deposit_val', 1000),
        ('description', 'Old Phone'),
        ('doc_needed', False),
        ('extra_requirements', 'I require delivery'),
        ('is_deliverable', True),
        ('max_rent_period', 12),
        ('min_rent_period', 10),
        ('sub_category', 'bike'),
        ('title', 'Iphone 13'),
    ],
)
def test_offer_partial_update(
        authed_api_client,
        db_test_data,
        sport_category,
        bike_subcategory,
        update_field,
        update_date
):
    response = authed_api_client.get('/api/v1/offers/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    # before update
    assert response.json() == {
        'category': 'phones',
        'city': 'Kiev',
        'cover_image': 'https://example.com/iphone.jpeg',
        'currency': 'UAH',
        'deposit_val': 0,
        'description': 'New Phone',
        'doc_needed': False,
        'extra_requirements': None,
        'id': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
        'images': [],
        'is_deliverable': True,
        'is_favorite': False,
        'is_promoted': False,
        'max_rent_period': None,
        'min_rent_period': None,
        'price': 499,
        'pub_date': '2020-10-29',
        'sub_category': 'iphones',
        'title': 'Iphone 12',
        'views': 0,
    }
    # perform partial update
    data = {update_field: update_date}
    response = authed_api_client.patch('/api/v1/offers/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/', data)
    assert response.json()[update_field] == update_date


def test_offer_image_delete(authed_api_client, offer_image):
    # before delete
    response = authed_api_client.get('/api/v1/offers/1b261f53-8e3b-4c14-abe6-5824c5d8b12e/')
    assert response.json()['images'] == [{'id': 1, 'url': 'https://example.com/iphone.jpeg'}]

    # perform delete
    response = authed_api_client.delete('/api/v1/offers/image/1/')
    assert response.status_code == 204

    # after delete
    response = authed_api_client.get('/api/v1/offers/1b261f53-8e3b-4c14-abe6-5824c5d8b12e/')
    assert response.json()['images'] == []


def test_offer_image_delete_no_authed(api_client, offer_image):
    response = api_client.delete('/api/v1/offers/image/1/')
    assert response.status_code == 401


def test_create_offer_no_authed(api_client, offer_image):
    response = api_client.post('/api/v1/offers/')
    assert response.status_code == 401


@freeze_time('2020-10-29')
def test_create_offer_with_images(authed_api_client, sport_category):
    data = json.dumps(
        {
            'category': 'sport',
            'city': 'Kiev',
            'cover_image': 'http://phoqer.com//mediafiles/image(1)_H802r7h.jpeg',
            'deposit_val': 100000,
            'description': 'Укажите нужно ли предоставить документы для оренды вашего товара',
            'doc_needed': False,
            'extra_requirements': 'Укажите нужно ли предоставить документы для оренды вашего товара',
            'images': [
                {'url': 'http://phoqer.com//mediafiles/image(1)_H802r7h.jpeg'},
                {'url': 'http://phoqer.com//mediafiles/image(2)_bGKHdms.jpeg'},
                {'url': 'http://phoqer.com//mediafiles/image(3)_PV4BY6L.jpeg'},
                {'url': 'http://phoqer.com//mediafiles/image(4)_SCiBiMz.jpeg'},
            ],
            'is_deliverable': False,
            'max_rent_period': None,
            'min_rent_period': None,
            'price': 10000,
            'sub_category': None,
            'title': 'name'
        }
    )
    response = authed_api_client.post('/api/v1/offers/', data=data, content_type='application/json')
    # assert response.status_code == 201
    response = response.json()
    # since 'id' every time is different I delete it from response before assert
    # but firstly assure that such field is exist and its type is int
    assert 'id' in response
    assert type(response.pop('id')) == str
    # now perform assert...
    assert response == {
        'category': 'sport',
        'city': 'Kiev',
        'cover_image': 'http://phoqer.com//mediafiles/image(1)_H802r7h.jpeg',
        'currency': None,
        'deposit_val': 100000,
        'description': 'Укажите нужно ли предоставить документы для оренды вашего товара',
        'doc_needed': False,
        'extra_requirements': 'Укажите нужно ли предоставить документы для оренды вашего товара',
        'images': [
            {
                'id': 1,
                'url': 'http://phoqer.com//mediafiles/image(1)_H802r7h.jpeg'
            },
            {
                'id': 2,
                'url': 'http://phoqer.com//mediafiles/image(2)_bGKHdms.jpeg'
            },
            {
                'id': 3,
                'url': 'http://phoqer.com//mediafiles/image(3)_PV4BY6L.jpeg'
            },
            {
                'id': 4,
                'url': 'http://phoqer.com//mediafiles/image(4)_SCiBiMz.jpeg'
            }
        ],
        'is_deliverable': False,
        'is_favorite': False,
        'is_promoted': False,
        'max_rent_period': None,
        'min_rent_period': None,
        'price': 10000,
        'pub_date': '2020-10-29', 'sub_category': None,
        'title': 'name', 'views': 0
    }


@freeze_time('2020-10-29')
def test_create_offer_without_images(authed_api_client, sport_category):
    data = json.dumps(
        {
            'category': 'sport',
            'city': 'Kiev',
            'cover_image': 'http://phoqer.com//mediafiles/image(1)_H802r7h.jpeg',
            'deposit_val': 100000,
            'description': 'Укажите нужно ли предоставить документы для оренды вашего товара',
            'doc_needed': False,
            'extra_requirements': 'Укажите нужно ли предоставить документы для оренды вашего товара',
            'is_deliverable': False,
            'max_rent_period': None,
            'min_rent_period': None,
            'price': 10000,
            'sub_category': None,
            'title': 'name'
        }
    )
    response = authed_api_client.post('/api/v1/offers/', data=data, content_type='application/json')
    # assert response.status_code == 201
    assert response.status_code == 201
    assert response.json()['images'] == []
