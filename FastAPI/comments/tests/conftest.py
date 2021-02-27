import pytest


@pytest.fixture
def client():
    from FastAPI.main import app
    from fastapi.testclient import TestClient

    with TestClient(app) as client:
        yield client
