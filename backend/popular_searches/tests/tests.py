import random

import pytest
from fastapi import status

pytestmark = pytest.mark.asyncio


async def test_get_popular_searches(client, monkeypatch):
    def mock_random_sample(population, k):
        return ["one", "two", "three"]

    monkeypatch.setattr(random, "sample", mock_random_sample)
    response = await client.get("/popular-searches")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "en": ["one", "two", "three"],
        "ru": ["one", "two", "three"],
        "ua": ["one", "two", "three"],
    }
