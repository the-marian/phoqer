import pytest
from fastapi import status

pytestmark = pytest.mark.asyncio


async def test_get_popular(client):
    response = await client.get("/popular")
    assert response.status_code == status.HTTP_200_OK
    expected_response = {
        "en": ["Iphone", "PS5", "VR", "Carrent", "Apartment", "Guitar"],
        "pl": ["Telefon komorkowy", "PS5", "VR", "Samochody", "Apartament", "Gitara"],
        "ua": ["Iphone", "PS5", "VR", "Каршеринг", "Квартира", "Гитара"]
    }
    assert expected_response == {
        "en": ["Iphone", "PS5", "VR", "Carrent", "Apartment", "Guitar"],
        "pl": ["Telefon komorkowy", "PS5", "VR", "Samochody", "Apartament", "Gitara"],
        "ua": ["Iphone", "PS5", "VR", "Каршеринг", "Квартира", "Гитара"]
    }
