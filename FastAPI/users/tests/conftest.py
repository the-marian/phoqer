import pytest


@pytest.fixture
def client():
    from FastAPI.main import app
    from fastapi.testclient import TestClient

    with TestClient(app) as client:
        yield client


@pytest.fixture
def auth_token(client):
    data = {"username": "marian.zozulia@gmail.com", "password": "apple-b@nana-f1re"}
    r = client.post("auth/login", data=data)
    auth_token = r.json()["access_token"]
    return {"Authorization": f"Bearer {auth_token}"}
