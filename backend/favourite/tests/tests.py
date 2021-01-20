from rest_framework import status
from offers.models import Offer


def test_favorite_for_user_1(api_client, author_1, authenticated_client_1, offer_1):
    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_12.favorite.add(author_1)
    iphone_12.save()

    response = authenticated_client_1.get('/api/v1/favorite/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {
            'cover_image': 'https://example.com/phone.jpeg',
            'currency': 'UAH','description': 'New Phone',
            'id': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
            'images': [],
            'is_deliverable': True,
            'is_favorite': True,
            'is_promoted': False,
            'price': 499,
            'pub_date': '2020-10-29',
            'title': 'Iphone 12',
            'views': 0
        }
    ]


def test_favorite_for_user_2(api_client, author_2, authenticated_client_2, offer_1, offer_2):
    iphone_12 = Offer.objects.get(title='Iphone 12')
    iphone_12.favorite.add(author_2)
    iphone_12.save()

    ps5 = Offer.objects.get(title='PS5')
    ps5.favorite.add(author_2)
    ps5.save()

    response = authenticated_client_2.get('/api/v1/favorite/')
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {
            'cover_image': 'https://example.com/phone.jpeg',
            'currency': 'UAH','description': 'New Phone',
            'id': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
            'images': [],
            'is_deliverable': True,
            'is_favorite': True,
            'is_promoted': False,
            'price': 499,
            'pub_date': '2020-10-29',
            'title': 'Iphone 12',
            'views': 0
        },
        {
            'cover_image': 'https://example.com/phone.jpeg',
            'currency': 'UAH', 'description': 'New PS5',
            'id': '1b261f53-8e3b-4c14-abe6-5824c5d8b66b',
            'images': [],
            'is_deliverable': True,
            'is_favorite': True,
            'is_promoted': False,
            'price': 350,
            'pub_date': '2020-10-29',
            'title': 'PS5',
            'views': 0
        }
    ]


def test_unauthorized_favorite(api_client):
    response = api_client.get('/api/v1/favorite/')
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def empty_favorite_list()



