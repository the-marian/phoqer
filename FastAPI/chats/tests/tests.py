from fastapi import status


def test_get_chats_not_auth(client):
    response = client.get("chats")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Not authenticated"}


def test_get_chats(client, auth_token):
    response = client.get("chats", headers=auth_token)
    assert response.status_code == status.HTTP_200_OK


def test_get_messages_not_auth(client):
    response = client.get("chats/1")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Not authenticated"}


def test_get_messages(client, auth_token):
    response = client.get("chats/1", headers=auth_token)
    assert response.status_code == status.HTTP_200_OK


def test_get_messages_invalid_chat_id(client, auth_token):
    response = client.get("chats/100000000", headers=auth_token)
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Chat with id 100000000 does not exist"}
