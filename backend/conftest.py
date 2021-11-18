import asyncio
import os
import uuid
from datetime import date, datetime

import asyncpg
import pytest
from async_asgi_testclient import TestClient
from databases import Database

from config import (
    BASE_DIR,
    PG_DB,
    PG_HOST,
    PG_PASSWORD,
    PG_PORT,
    PG_USER,
    TEST_DATABASE_URL,
    TEST_PG_DB,
)
from main import app


@pytest.fixture
async def client(db):
    async with TestClient(app) as client:
        yield client


@pytest.fixture
async def marian_auth_token(client, user_marian):
    data = {"username": "marian.zozulia@gmail.com", "password": "apple-b@nana-f1re"}
    r = await client.post("/auth/login", form=data)
    auth_token = r.json()["access_token"]
    return {"Authorization": f"Bearer {auth_token}"}


@pytest.fixture
async def igor_auth_token(client, user_igor):
    data = {"username": "igorrr.thlw5@gmail.com", "password": "apple-b@nana-f1re"}
    r = await client.post("/auth/login", form=data)
    auth_token = r.json()["access_token"]
    return {"Authorization": f"Bearer {auth_token}"}


@pytest.fixture
async def egor_auth_token(client, user_egor):
    data = {"username": "fatamorganaa933@gmail.com", "password": "apple-b@nana-f1re"}
    r = await client.post("/auth/login", form=data)
    auth_token = r.json()["access_token"]
    return {"Authorization": f"Bearer {auth_token}"}


@pytest.fixture(scope="session")
async def _create_test_db():
    conn = await asyncpg.connect(
        user=PG_USER, password=PG_PASSWORD, host=PG_HOST, port=PG_PORT, database=PG_DB
    )
    try:
        create_query = f"CREATE database {TEST_PG_DB};"
        drop_query = f"DROP DATABASE IF EXISTS {TEST_PG_DB};"
        await conn.execute(drop_query)
        await conn.execute(create_query)
    finally:
        await conn.close()


@pytest.fixture(scope="session")
async def _migrate(_create_test_db):
    conn = await asyncpg.connect(
        user=PG_USER,
        password=PG_PASSWORD,
        host=PG_HOST,
        port=PG_PORT,
        database=TEST_PG_DB,
    )
    try:
        migrations_dir = os.path.join(BASE_DIR, "migrations")
        migration_files = os.listdir(migrations_dir)
        migration_files.sort()
        for migration_file_name in migration_files:
            if migration_file_name.split(".")[-2] == "up":
                migration_file_path = os.path.join(migrations_dir, migration_file_name)
                with open(migration_file_path) as file:
                    query = file.read()
                    await conn.execute(query)
    finally:
        await conn.close()


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop()
    yield loop
    loop.close()


@pytest.fixture
async def db(_migrate):
    async with Database(TEST_DATABASE_URL) as database:
        yield database


@pytest.fixture
async def category_technics(db):
    query = """
    INSERT INTO categories_parentcategories (
        image,
        is_active,
        priority,
        slug,
        icon_image)
    VALUES (
        :image,
        :is_active,
        :priority,
        :slug,
        :icon_image
    )"""
    values = {
        "image": "http://phoqer.com/mediafiles/"
        "cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",
        "is_active": True,
        "priority": 1,
        "slug": "technics",
        "icon_image": "technics",
    }
    await db.execute(query=query, values=values)
    yield "technics"
    delete_query = "DELETE FROM categories_parentcategories WHERE slug='technics'"
    await db.execute(query=delete_query)


@pytest.fixture
async def sub_category_consoles(db, category_technics):
    query = """
    INSERT INTO categories_childcategories (
        slug,
        parent_id,
        icon_image)
    VALUES (
        :slug,
        :parent_id,
        :icon_image
    )"""
    values = {
        "slug": "consoles",
        "parent_id": "technics",
        "icon_image": "consoles",
    }
    await db.execute(query=query, values=values)
    yield "consoles"
    delete_query = "DELETE FROM categories_childcategories WHERE slug='consoles'"
    await db.execute(query=delete_query)


@pytest.fixture
async def country_ukraine(db):
    query = "INSERT INTO countries (slug) VALUES (:slug)"
    values = {"slug": "ukraine"}
    await db.execute(query=query, values=values)
    yield "ukraine"
    delete_query = "DELETE FROM countries WHERE slug='ukraine'"
    await db.execute(query=delete_query)


@pytest.fixture
async def country_poland(db):
    query = "INSERT INTO countries (slug) VALUES (:slug)"
    values = {"slug": "poland"}
    await db.execute(query=query, values=values)
    yield "poland"
    delete_query = "DELETE FROM countries WHERE slug='poland'"
    await db.execute(query=delete_query)


@pytest.fixture
async def city_kiev(db, country_ukraine):
    query = """
    INSERT INTO cities (
        slug,
        countries_slug)
    VALUES (
        :slug,
        :countries_slug)"""
    values = {"slug": "kiev", "countries_slug": "ukraine"}
    await db.execute(query=query, values=values)
    yield "kiev"
    delete_query = "DELETE FROM cities WHERE slug='kiev'"
    await db.execute(query=delete_query)


@pytest.fixture
async def city_warsaw(db, country_poland):
    query = """
    INSERT INTO cities (
        slug,
        countries_slug)
    VALUES (
        :slug,
        :countries_slug)"""
    values = {"slug": "warsaw", "countries_slug": "poland"}
    await db.execute(query=query, values=values)
    yield "warsaw"
    delete_query = "DELETE FROM cities WHERE slug='warsaw'"
    await db.execute(query=delete_query)


@pytest.fixture
async def user_marian(db, country_poland, city_warsaw):
    query = """
    INSERT INTO users_user (
        id,
        password,
        last_login,
        is_superuser,
        first_name,
        last_name,
        is_staff,
        is_active,
        date_joined,
        bio,
        birth_date,
        email,
        profile_img,
        country,
        city)
    VALUES (
        :id,
        :password,
        :last_login,
        :is_superuser,
        :first_name,
        :last_name,
        :is_staff,
        :is_active,
        :date_joined,
        :bio,
        :birth_date,
        :email,
        :profile_img,
        :country,
        :city)"""
    values = {
        "id": 1,
        "password": "$2b$12$6DVnORNuohV8olN5cNzqKufCRGGnUYiYZJkjAjPcAt8roFRGyo4/e",
        "last_login": date(2021, 7, 7),
        "is_superuser": False,
        "first_name": "Marian",
        "last_name": "Zozulia",
        "is_staff": False,
        "is_active": True,
        "date_joined": date(2021, 3, 9),
        "bio": "Made on Earth by humans... Currently hanging out in Warsaw",
        "birth_date": date(1997, 11, 6),
        "email": "marian.zozulia@gmail.com",
        "profile_img": "http://phoqer.com/mediafiles/"
        "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
        "country": "poland",
        "city": "warsaw",
    }
    await db.execute(query=query, values=values)
    yield 1
    delete_query = "DELETE FROM users_user WHERE id=1"
    await db.execute(query=delete_query)


@pytest.fixture
async def user_igor(db, country_ukraine, city_kiev):
    query = """
    INSERT INTO users_user (
        id,
        password,
        last_login,
        is_superuser,
        first_name,
        last_name,
        is_staff,
        is_active,
        date_joined,
        bio,
        birth_date,
        email,
        profile_img,
        country,
        city)
    VALUES (
        :id,
        :password,
        :last_login,
        :is_superuser,
        :first_name,
        :last_name,
        :is_staff,
        :is_active,
        :date_joined,
        :bio,
        :birth_date,
        :email,
        :profile_img,
        :country,
        :city)"""
    values = {
        "id": 3,
        "password": "$2b$12$6DVnORNuohV8olN5cNzqKufCRGGnUYiYZJkjAjPcAt8roFRGyo4/e",
        "last_login": date(2021, 7, 7),
        "is_superuser": False,
        "first_name": "Igor",
        "last_name": "Mikhailichenko",
        "is_staff": False,
        "is_active": True,
        "date_joined": date(2019, 11, 9),
        "bio": "I love fishing",
        "birth_date": date(1995, 12, 9),
        "email": "igorrr.thlw5@gmail.com",
        "profile_img": "http://phoqer.com/mediafiles/"
        "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",
        "country": country_ukraine,
        "city": city_kiev,
    }
    await db.execute(query=query, values=values)
    yield 1
    delete_query = "DELETE FROM users_user WHERE id=1"
    await db.execute(query=delete_query)


@pytest.fixture
async def user_egor(db, country_ukraine, city_kiev):
    query = """
    INSERT INTO users_user (
        id,
        password,
        last_login,
        is_superuser,
        first_name,
        last_name,
        is_staff,
        is_active,
        date_joined,
        bio,
        birth_date,
        email,
        profile_img,
        country,
        city)
    VALUES (
        :id,
        :password,
        :last_login,
        :is_superuser,
        :first_name,
        :last_name,
        :is_staff,
        :is_active,
        :date_joined,
        :bio,
        :birth_date,
        :email,
        :profile_img,
        :country,
        :city)"""
    values = {
        "id": 2,
        "password": "$2b$12$6DVnORNuohV8olN5cNzqKufCRGGnUYiYZJkjAjPcAt8roFRGyo4/e",
        "last_login": date(2020, 7, 7),
        "is_superuser": False,
        "first_name": "Egor",
        "last_name": "Leletsky",
        "is_staff": False,
        "is_active": True,
        "date_joined": date(2020, 3, 9),
        "bio": "Nie mam opisu profilu i co ty na to ?",
        "birth_date": date(1998, 3, 22),
        "email": "fatamorganaa933@gmail.com",
        "profile_img": None,
        "country": country_ukraine,
        "city": city_kiev,
    }
    await db.execute(query=query, values=values)
    yield 2
    delete_query = "DELETE FROM users_user WHERE id=2"
    await db.execute(query=delete_query)


@pytest.fixture
async def sub_category_phones(db, category_technics):
    query = """
    INSERT INTO categories_childcategories (
        slug,
        parent_id,
        icon_image)
    VALUES (
        :slug,
        :parent_id,
        :icon_image
    )"""
    values = {
        "slug": "phones",
        "parent_id": "technics",
        "icon_image": "phones",
    }
    await db.execute(query=query, values=values)
    yield "phones"
    delete_query = "DELETE FROM categories_childcategories WHERE slug='phones'"
    await db.execute(query=delete_query)


@pytest.fixture
async def offer_ps4(
    db, user_marian, category_technics, sub_category_consoles, country_poland, city_warsaw
):
    query = """
    INSERT INTO offers_offer (
        city,
        cover_image,
        currency,
        deposit_val,
        description,
        doc_needed,
        extra_requirements,
        id,
        is_deliverable,
        price,
        promote_til_date,
        pub_date,
        status,
        title,
        views,
        author_id,
        category_id,
        sub_category_id,
        max_rent_period,
        min_rent_period,
        country,
        items_amount,
        rental_period)
    VALUES (
        :city,
        :cover_image,
        :currency,
        :deposit_val,
        :description,
        :doc_needed,
        :extra_requirements,
        :id,
        :is_deliverable,
        :price,
        :promote_til_date,
        :pub_date,
        :status,
        :title,
        :views,
        :author_id,
        :category_id,
        :sub_category_id,
        :max_rent_period,
        :min_rent_period,
        :country,
        :items_amount,
        :rental_period)"""
    values = {
        "city": "warsaw",
        "cover_image": "http://phoqer.com/mediafiles/"
        "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",
        "currency": "PLN",
        "deposit_val": 500,
        "description": "Konsola Sony PlayStation 4 Nowa!",
        "doc_needed": False,
        "extra_requirements": "Zdęcie dowodu osobistego",
        "id": uuid.UUID("a30b8a1e-1c60-4bbc-ac3d-37df2d224000"),
        "is_deliverable": True,
        "price": 100,
        "promote_til_date": date(2022, 1, 1),
        "pub_date": date(2021, 5, 21),
        "status": "ACTIVE",
        "title": "SONY PlayStation 4",
        "views": 1,
        "author_id": 1,
        "category_id": "technics",
        "sub_category_id": "consoles",
        "max_rent_period": 100,
        "min_rent_period": 3,
        "country": "poland",
        "items_amount": 1,
        "rental_period": "DAY",
    }
    await db.execute(query=query, values=values)
    yield uuid.UUID("a30b8a1e-1c60-4bbc-ac3d-37df2d224000")
    delete_query = """
    DELETE FROM offers_offer
    WHERE id='a30b8a1e-1c60-4bbc-ac3d-37df2d224000'"""
    await db.execute(query=delete_query)


@pytest.fixture
async def notification1(db, offer_ps4):
    query = """
    INSERT INTO notifications (
        id,
        notification_type,
        offer_id,
        pub_date,
        recipient_id,
        viewed
    )
    VALUES (
        :id,
        :notification_type,
        :offer_id,
        :pub_date,
        :recipient_id,
        :viewed
    )"""
    values = {
        "id": 1,
        "notification_type": "RENT_REQUEST",
        "offer_id": uuid.UUID("a30b8a1e-1c60-4bbc-ac3d-37df2d224000"),
        "pub_date": datetime(2021, 10, 18, 12, 16, 59),
        "recipient_id": 1,
        "viewed": False,
    }
    await db.execute(query=query, values=values)
    yield 1
    delete_query = "DELETE FROM notifications WHERE id=1"
    await db.execute(query=delete_query)


@pytest.fixture
async def notification2(db, offer_iphone12):
    query = """
    INSERT INTO notifications (
        id,
        notification_type,
        offer_id,
        pub_date,
        recipient_id,
        viewed
    )
    VALUES (
        :id,
        :notification_type,
        :offer_id,
        :pub_date,
        :recipient_id,
        :viewed
    )"""
    values = {
        "id": 2,
        "notification_type": "RENT_END",
        "offer_id": uuid.UUID("a30b8a1e-1c60-4bbc-ac3d-37df2d224001"),
        "pub_date": datetime(2021, 10, 20, 10, 16, 00),
        "recipient_id": 2,
        "viewed": True,
    }
    await db.execute(query=query, values=values)
    yield 2
    delete_query = "DELETE FROM notifications WHERE id=2"
    await db.execute(query=delete_query)


# @pytest.fixture
# def offer_with_two_ps4(
#     db,
#     user_marian,
#     categoty_technics,
#     sub_category_consoles,
#     country_poland,
#     city_warsaw
# ):
#     query = """
#     INSERT INTO offers_offer (
#         city,
#         cover_image,
#         currency,
#         deposit_val,
#         description,
#         doc_needed,
#         extra_requirements,
#         id,
#         is_deliverable,
#         price,
#         promote_til_date,
#         pub_date,
#         status,
#         title,
#         views,
#         author_id,
#         category_id,
#         sub_category_id,
#         max_rent_period,
#         min_rent_period,
#         country,
#         items_amount,
#         rental_period)
#     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
#     %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
#     RETURNING id"""
#     values = (
#         "warsaw",  # city
#         "http://phoqer.com/mediafiles/"
#         "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",  # cover_image
#         "PLN",  # currency
#         "500",  # deposit_val
#         "Konsola Sony PlayStation 4 Nowa!",  # description
#         False,  # doc_needed
#         "Zdęcie dowodu osobistego",  # extra_requirements
#         "a30b8a1e-1c60-4bbc-ac3d-37df2d224002",  # id
#         True,  # is_deliverable
#         "100",  # price
#         "2022-01-01",  # promote_til_date
#         "2021-05-21",  # pub_date
#         "ACTIVE",  # status
#         "SONY PlayStation 4",  # title
#         "1",  # views
#         "1",  # author_id
#         "technics",  # category_id
#         "consoles",  # sub_category_id
#         "100",  # max_rent_period
#         "3",  # min_rent_period
#         "poland",  # country
#         "2",  # items_amount
#         "DAY",  # rental_period
#     )
#     db.execute(query, values)
#     return "a30b8a1e-1c60-4bbc-ac3d-37df2d224002"
#
#
@pytest.fixture
async def offer_iphone12(
    db, user_egor, category_technics, sub_category_phones, country_ukraine, city_kiev
):
    query = """
    INSERT INTO offers_offer (
        city,
        cover_image,
        currency,
        deposit_val,
        description,
        doc_needed,
        extra_requirements,
        id,
        is_deliverable,
        price,
        promote_til_date,
        pub_date,
        status,
        title,
        views,
        author_id,
        category_id,
        sub_category_id,
        max_rent_period,
        min_rent_period,
        country,
        items_amount,
        rental_period)
    VALUES (
        :city,
        :cover_image,
        :currency,
        :deposit_val,
        :description,
        :doc_needed,
        :extra_requirements,
        :id,
        :is_deliverable,
        :price,
        :promote_til_date,
        :pub_date,
        :status,
        :title,
        :views,
        :author_id,
        :category_id,
        :sub_category_id,
        :max_rent_period,
        :min_rent_period,
        :country,
        :items_amount,
        :rental_period)"""
    values = {
        "city": "kiev",
        "cover_image": "http://phoqer.com/mediafiles/"
        "52cade24-63d6-4f04-bf8c-34489d0c67f1-2369.png",
        "currency": "PLN",
        "deposit_val": 200,
        "description": "Nowy Iphone 12!",
        "doc_needed": False,
        "extra_requirements": "Zdęcie dowodu osobistego",
        "id": uuid.UUID("a30b8a1e-1c60-4bbc-ac3d-37df2d224001"),
        "is_deliverable": True,
        "price": 200,
        "promote_til_date": date(2022, 1, 1),
        "pub_date": date(2021, 5, 21),
        "status": "ACTIVE",
        "title": "Iphone 12",
        "views": 1101,
        "author_id": 2,
        "category_id": "technics",
        "sub_category_id": "phones",
        "max_rent_period": 7,
        "min_rent_period": 1,
        "country": "ukraine",
        "items_amount": 1,
        "rental_period": "DAY",
    }
    await db.execute(query=query, values=values)
    yield uuid.UUID("a30b8a1e-1c60-4bbc-ac3d-37df2d224001")
    delete_query = """
    DELETE FROM offers_offer
    WHERE id='a30b8a1e-1c60-4bbc-ac3d-37df2d224001'"""
    await db.execute(query=delete_query)


@pytest.fixture
async def chat_marian_egor(db, user_marian, user_egor, offer_ps4):
    query = """
    INSERT INTO chats (
        chat_id,
        author_id,
        client_id,
        offer_id,
        creation_datetime,
        is_done)
    VALUES (
        :chat_id,
        :author_id,
        :client_id,
        :offer_id,
        :creation_datetime,
        :is_done)
    """
    values = {
        "chat_id": 1,
        "author_id": user_marian,
        "client_id": user_egor,
        "offer_id": offer_ps4,
        "creation_datetime": date(2022, 1, 1),
        "is_done": False,
    }
    await db.execute(query=query, values=values)
    yield "1"
    query = "DELETE FROM chats WHERE chat_id = 1"
    await db.execute(query=query)


@pytest.fixture
async def chat_egor_marian(db, user_marian, user_egor, offer_iphone12):
    query = """
    INSERT INTO chats (
        chat_id,
        author_id,
        client_id,
        offer_id,
        creation_datetime,
        is_done)
    VALUES (
        :chat_id,
        :author_id,
        :client_id,
        :offer_id,
        :creation_datetime,
        :is_done)
    """
    values = {
        "chat_id": 2,
        "author_id": user_egor,
        "client_id": user_marian,
        "offer_id": offer_iphone12,
        "creation_datetime": date(2022, 1, 1),
        "is_done": False,
    }
    await db.execute(query=query, values=values)
    yield "2"
    query = "DELETE FROM chats WHERE chat_id = 2"
    await db.execute(query=query)


#
# @pytest.fixture
# def _messages(db, chat_marian_egor):
#     query = """
#     INSERT INTO messages (
#         author_id,
#         chat_id,
#         creation_datetime,
#         id,
#         is_red,
#         message_type,
#         text)
#     VALUES
#     """
#     data = [
#         (
#             1,  # author_id
#             chat_marian_egor,  # chat_id
#             "2021-06-20 15:01:32.639425+00",  # creation_datetime
#             1,  # id
#             True,  # is_red
#             MessageType.RENT_REQUEST.value,  # message_type
#             "gAAAAABgz1xIJTxsDDfVoveXWFpFIl-Mk55Gp8iLX--cAZUE6na_F6jL"
#             "bDy4pMnlQkxeskt0hKp1glOHxzoDaKlhD0pzpFdDWQ==",  # text
#         )
#     ]
#     data.extend(
#         [
#             (
#                 1,  # author_id
#                 chat_marian_egor,  # chat_id
#                 f"2021-06-20 15:{i}:32.639425+00",  # creation_datetime
#                 i,  # id
#                 True,  # is_red
#                 MessageType.MESSAGE.value,  # message_type
#                 "gAAAAABgz1xIJTxsDDfVoveXWFpFIl-Mk55Gp8iLX--cAZUE6na_F6jL"
#                 "bDy4pMnlQkxeskt0hKp1glOHxzoDaKlhD0pzpFdDWQ==",  # text
#             )
#             for i in range(11, 51, 2)
#         ]
#     )
#     data.extend(
#         [
#             (
#                 2,  # author_id
#                 chat_marian_egor,  # chat_id
#                 f"2021-06-20 15:{i}:32.639425+00",  # creation_datetime
#                 i,  # id
#                 True,  # is_red
#                 MessageType.MESSAGE.value,  # message_type
#                 "gAAAAABgz1xIJTxsDDfVoveXWFpFIl-Mk55Gp8iLX--cAZUE6na_F6jL"
#                 "bDy4pMnlQkxeskt0hKp1glOHxzoDaKlhD0pzpFdDWQ==",  # text
#             )
#             for i in range(10, 50, 2)
#         ]
#     )
#     args_str = ",".join(
#         db.mogrify("(%s, %s, %s, %s, %s, %s, %s)", x).decode("utf-8") for x in data
#     )
#     db.execute(query + args_str)
