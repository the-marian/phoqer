from rest_framework import status


def test_list_favourite_endpoint(api_client):
    response = api_client.get('api/v1/favourite')
    assert response.status_code == status.HTTP_200_OK
