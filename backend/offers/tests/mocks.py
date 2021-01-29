no_deposit_true = '/api/v1/offers/search/?no_deposit=True'
max_deposit_filter = '/api/v1/offers/search/?max_deposit=250'
min_deposit_filter = '/api/v1/offers/search/?min_deposit=250'

offers_create_endpoint_url = 'api/v1/offers'
image_iphone_url = 'https://example.com/iphone.jpeg'
phones_image_url = 'https://example.com/phone.jpeg'

list_offers_expected_response = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    },
]

Iphone_10 = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    }
]

list_offers_without_iphone10 = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 0
    },
]

iphone11_is_promoted_True = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_favorite": False,
        "is_promoted": True,
        "is_deliverable": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    },
]

iphone11_is_promoted_False = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    },
]

list_ordered_by_promotion = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_deliverable": True,
        "is_favorite": False,
        "is_promoted": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_deliverable": False,
        "is_favorite": False,
        "is_promoted": True,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_deliverable": True,
        "is_favorite": False,
        "is_promoted": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
]

list_ordered_by_views = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_deliverable": False,
        "is_favorite": False,
        "is_promoted": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 1290
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_deliverable": True,
        "is_favorite": False,
        "is_promoted": False,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 376
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_deliverable": True,
        "is_favorite": False,
        "is_promoted": False,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 128
    },
]

list_order_mixed = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": True,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 257
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_favorite": False,
        "is_promoted": True,
        "is_deliverable": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 674
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": True,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 238
    },
]

search_filter_city_mock = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
]

search_filter_status_in_rent_mock = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    },
]

search_filter_is_deliverable_mock = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    },
]

search_test_description_mock = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    },
]

ascending_price_ordering_mock = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    }
]

ascending_deposit_ordering_mock = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 0
    }
]

descending_deposit_ordering_mock = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    }
]

max_price_order_mock = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    }
]

no_deposit_true_mock = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old piece of Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b77e",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 299,
        "pub_date": "2020-10-29",
        "title": "Iphone 10",
        "views": 0
    }
]

max_deposit_filter_mock = [
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "New Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b66c",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": True,
        "price": 499,
        "pub_date": "2020-10-29",
        "title": "Iphone 12",
        "views": 0
    },
    {
        "cover_image": image_iphone_url,
        "currency": "UAH",
        "description": "Old Phone",
        "id": "1b261f53-8e3b-4c14-abe6-5824c5d8b67d",
        "images": [],
        "is_favorite": False,
        "is_promoted": False,
        "is_deliverable": False,
        "price": 399,
        "pub_date": "2020-10-29",
        "title": "Iphone 11",
        "views": 0
    }
]
