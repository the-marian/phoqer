from fastapi import status


def test_list_categories(client):
    response = client.get("categories/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {
            "icon_image": None,
            "image": "https://example.comm/dickpic.jpg",
            "slug": "kitty",
            "sub_category": [],
        },
        {
            "icon_image": None,
            "image": "https://example.com/dic_pic.jpg",
            "slug": "sport",
            "sub_category": [{"icon_image": None, "slug": "bike"}],
        },
    ]
