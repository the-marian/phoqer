# from fastapi import status
#
#
# def test_get_favorite(client, marian_auth_token):
#     response = client.get("favorite/", headers=marian_auth_token)
#     assert response.status_code == status.HTTP_200_OK
#     assert response.json() == [
#         {
#             "cover_image": "https://example.com/iphone.jpeg",
#             "currency": "UAH",
#             "description": "New Phone",
#             "id": "0572cddc-a206-4c99-af4f-ba215f04a4e8",
#             "is_deliverable": True,
#             "is_favorite": True,
#             "is_promoted": False,
#             "price": 444,
#             "pub_date": "2021-02-05",
#             "title": "Iphone 12",
#             "views": 10000,
#         },
#         {
#             "cover_image": "https://example.com/iphone.jpeg",
#             "currency": "UAH",
#             "description": "New Phone",
#             "id": "1a114c8e-14b7-46e4-8ad0-f251a35a6938",
#             "is_deliverable": True,
#             "is_favorite": True,
#             "is_promoted": False,
#             "price": 499,
#             "pub_date": "2021-01-21",
#             "title": "Iphone 12",
#             "views": 1,
#         },
#     ]
