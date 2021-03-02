from fastapi import status


def test_get_offer(client):
    response = client.get("offers/7cea9f56-e211-467b-8515-aa88f4a4a5c3")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "author_id": 1,
        "category": "kitty",
        "category_name": "Kitty",
        "city": "Kiev",
        "cover_image": "https://example.com/iphone.jpeg",
        "currency": "UAH",
        "deposit_val": 0,
        "description": "New Phone",
        "doc_needed": True,
        "extra_requirements": "text exta req",
        "first_name": "Marian",
        "id": "7cea9f56-e211-467b-8515-aa88f4a4a5c3",
        "images": [
            "http://phoqer.com//mediafiles/image(1)_H802r7h.jpeg",
            "http://phoqer.com//mediafiles/image(2)_bGKHdms.jpeg",
            "http://phoqer.com//mediafiles/image(3)_PV4BY6L.jpeg",
            "http://phoqer.com//mediafiles/image(4)_SCiBiMz.jpeg",
            "http://phoqer.com//mediafiles/5_zDDUs4j.jpg",
            "http://phoqer.com//mediafiles/4_QsbenAd.jpg",
            "http://phoqer.com//mediafiles/3_5vqrqhm.jpg",
            "http://phoqer.com//mediafiles/2_5jbRqfd.jpg",
            "http://phoqer.com//mediafiles/1_RrQEWYc.jpg",
        ],
        "is_deliverable": True,
        "is_favorite": False,
        "is_promoted": True,
        "last_name": "Zozulia",
        "max_rent_period": 10,
        "min_rent_period": 20,
        "price": 499,
        "profile_img": "https://example.com/dic_pic.jpeg",
        "pub_date": "2021-01-20",
        "status": "DRAFT",
        "sub_category": "bike",
        "sub_category_name": "Bike",
        "title": "Iphone 12",
        "views": 0,
    }


def test_is_favorite_user_with_favorite(client):
    response = client.get(
        "offers/1a114c8e-14b7-46e4-8ad0-f251a35a6938",
        headers={
            "Authorization":
                "Token 535a311d30844859d342b70bb45779818f824e08"
        },
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["is_favorite"] is True


def test_is_favorite_user_with_no_favorite(client):
    response = client.get(
        "offers/7cea9f56-e211-467b-8515-aa88f4a4a5c3",
        headers={
            "Authorization":
                "Token 535a311d30844859d342b70bb45779818f824e08"
        },
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["is_favorite"] is False


def test_create_offer_draft(client):
    post_data = {
        "category": "kitty",
        "city": "Kiev",
        "cover_image": "https://example.com/iphone.jpeg",
        "currency": "UAH",
        "deposit_val": 666,
        "description": "New Phone",
        "doc_needed": True,
        "extra_requirements": "text exta req",
        "first_name": "Marian",
        "images": [
            "http://phoqer.com//mediafiles/image(1)_H802r7h.jpeg",
            "http://phoqer.com//mediafiles/image(2)_bGKHdms.jpeg",
            "http://phoqer.com//mediafiles/image(3)_PV4BY6L.jpeg",
            "http://phoqer.com//mediafiles/image(4)_SCiBiMz.jpeg",
            "http://phoqer.com//mediafiles/5_zDDUs4j.jpg",
            "http://phoqer.com//mediafiles/4_QsbenAd.jpg",
            "http://phoqer.com//mediafiles/3_5vqrqhm.jpg",
            "http://phoqer.com//mediafiles/2_5jbRqfd.jpg",
            "http://phoqer.com//mediafiles/1_RrQEWYc.jpg",
        ],
        "is_deliverable": True,
        "last_name": "Zozulia",
        "max_rent_period": 10,
        "min_rent_period": 20,
        "price": 499,
        "sub_category": "bike",
        "title": "Iphone 12",
        "views": 0,
    }
    response = client.post(
        "offers",
        json=post_data,
        headers={
            "Authorization":
                "Token 535a311d30844859d342b70bb45779818f824e08"
        },
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT


def test_create_offer_not_authed(client):
    post_data = {}
    response = client.post(
        "offers",
        json=post_data,
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
