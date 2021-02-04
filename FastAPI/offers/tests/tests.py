def test_get_offers(client):
    response = client.get("offers/7cea9f56-e211-467b-8515-aa88f4a4a5c3")
    assert response.status_code == 200
    assert response.json() == {
        'author_id': 1,
        'category': 'kitty',
        'category_name': 'Kitty',
        'city': 'Kiev',
        'cover_image': 'https://example.com/iphone.jpeg',
        'currency': 'UAH',
        'deposit_val': 0,
        'description': 'New Phone',
        'doc_needed': True,
        'extra_requirements': 'text exta req',
        'first_name': 'Marian',
        'id': '7cea9f56-e211-467b-8515-aa88f4a4a5c3',
        'images': [
            'http://phoqer.com//mediafiles/image(1)_H802r7h.jpeg',
            'http://phoqer.com//mediafiles/image(2)_bGKHdms.jpeg',
            'http://phoqer.com//mediafiles/image(3)_PV4BY6L.jpeg',
            'http://phoqer.com//mediafiles/image(4)_SCiBiMz.jpeg',
            'http://phoqer.com//mediafiles/5_zDDUs4j.jpg',
            'http://phoqer.com//mediafiles/4_QsbenAd.jpg',
            'http://phoqer.com//mediafiles/3_5vqrqhm.jpg',
            'http://phoqer.com//mediafiles/2_5jbRqfd.jpg',
            'http://phoqer.com//mediafiles/1_RrQEWYc.jpg'
        ],
        'is_deliverable': True,
        'is_promoted': True,
        'last_name': 'Zozulia',
        'max_rent_period': 10,
        'min_rent_period': 20,
        'price': 499,
        'profile_img': 'https://example.com/dic_pic.jpeg',
        'pub_date': '2021-01-20',
        'status': 'DRAFT',
        'sub_category': 'bike',
        'sub_category_name': 'Bike',
        'title': 'Iphone 12',
        'views': 0
    }
