def test_get_comments(client):
    response = client.get("comments/5edb79e3-aeff-4b73-88f0-d572aec9c9a8")
    assert response.status_code == 200
