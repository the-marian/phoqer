from fastapi.testclient import TestClient


def test_get_access_token(client: TestClient) -> None:
    login_data = {
        "username": "marian@gmail.com",
        "password": "i_am_hungry",
    }
    r = client.post("auth/login", data=login_data)
    tokens = r.json()
    assert r.status_code == 200
    assert "access_token" in tokens
    assert tokens["access_token"]
    assert tokens["token_type"] == "bearer"


def test_get_access_token_for_inactive_user(client: TestClient) -> None:
    login_data = {
        "username": "marian.zozulia@gmail.com",
        "password": "kitty",
    }
    r = client.post("auth/login", data=login_data)
    assert r.status_code == 400
    assert r.json()["detail"] == "Inactive user"
