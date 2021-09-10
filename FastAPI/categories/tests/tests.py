import pdb

import pytest


@pytest.mark.asyncio
async def test_list_categories(client, category_technics, sub_category_consoles):
    response = await client.get("/categories")
    assert response.status_code == 200
    assert response.json() == [
        {
            "icon_image": "technics",
            "image": "http://phoqer.com/mediafiles/cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
            "slug": "technics",
            "sub_category": [{"icon_image": "consoles", "slug": "consoles"}],
        }
    ]

@pytest.mark.asyncio
async def test_list_ctegories(client, category_technics, sub_category_consoles):
    response = await client.get("/categories")
    assert response.status_code == 200
    assert response.json() == [
        {
            "icon_image": "technics",
            "image": "http://phoqer.com/mediafiles/cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
            "slug": "technics",
            "sub_category": [{"icon_image": "consoles", "slug": "consoles"}],
        }
    ]

@pytest.mark.asyncio
async def test_list_caegories(client, category_technics, sub_category_consoles):
    response = await client.get("/categories")
    assert response.status_code == 200
    assert response.json() == [
        {
            "icon_image": "technics",
            "image": "http://phoqer.com/mediafiles/cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
            "slug": "technics",
            "sub_category": [{"icon_image": "consoles", "slug": "consoles"}],
        }
    ]

@pytest.mark.asyncio
async def test_list_catgories(client, category_technics, sub_category_consoles):
    response = await client.get("/categories")
    assert response.status_code == 200
    assert response.json() == [
        {
            "icon_image": "technics",
            "image": "http://phoqer.com/mediafiles/cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
            "slug": "technics",
            "sub_category": [{"icon_image": "consoles", "slug": "consoles"}],
        }
    ]

@pytest.mark.asyncio
async def test_list_cateories(client, category_technics, sub_category_consoles):
    response = await client.get("/categories")
    assert response.status_code == 200
    assert response.json() == [
        {
            "icon_image": "technics",
            "image": "http://phoqer.com/mediafiles/cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
            "slug": "technics",
            "sub_category": [{"icon_image": "consoles", "slug": "consoles"}],
        }
    ]

@pytest.mark.asyncio
async def test_list_categries(client, category_technics, sub_category_consoles):
    response = await client.get("/categories")
    assert response.status_code == 200
    assert response.json() == [
        {
            "icon_image": "technics",
            "image": "http://phoqer.com/mediafiles/cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
            "slug": "technics",
            "sub_category": [{"icon_image": "consoles", "slug": "consoles"}],
        }
    ]

@pytest.mark.asyncio
async def test_list_categoies(client, category_technics, sub_category_consoles):
    response = await client.get("/categories")
    assert response.status_code == 200
    assert response.json() == [
        {
            "icon_image": "technics",
            "image": "http://phoqer.com/mediafiles/cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
            "slug": "technics",
            "sub_category": [{"icon_image": "consoles", "slug": "consoles"}],
        }
    ]

@pytest.mark.asyncio
async def test_list_categores(client, category_technics, sub_category_consoles):
    response = await client.get("/categories")
    assert response.status_code == 200
    assert response.json() == [
        {
            "icon_image": "technics",
            "image": "http://phoqer.com/mediafiles/cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
            "slug": "technics",
            "sub_category": [{"icon_image": "consoles", "slug": "consoles"}],
        }
    ]

@pytest.mark.asyncio
async def test_list_categoris(client, category_technics, sub_category_consoles):
    response = await client.get("/categories")
    assert response.status_code == 200
    assert response.json() == [
        {
            "icon_image": "technics",
            "image": "http://phoqer.com/mediafiles/cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
            "slug": "technics",
            "sub_category": [{"icon_image": "consoles", "slug": "consoles"}],
        }
    ]

@pytest.mark.asyncio
async def test_list_categorie(client, category_technics, sub_category_consoles):
    response = await client.get("/categories")
    assert response.status_code == 200
    assert response.json() == [
        {
            "icon_image": "technics",
            "image": "http://phoqer.com/mediafiles/cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
            "slug": "technics",
            "sub_category": [{"icon_image": "consoles", "slug": "consoles"}],
        }
    ]
