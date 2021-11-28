import random

import pytest
from fastapi import status

pytestmark = pytest.mark.asyncio


async def test_get_popular(client, monkeypatch):
    def mock_random(population, k):
        return ["one", "two", "three"]

    monkeypatch.setattr(random, "sample", mock_random)
    response = await client.get("/popular")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "en": ["one", "two", "three"],
        "pl": ["one", "two", "three"],
        "ua": ["one", "two", "three"],
    }
