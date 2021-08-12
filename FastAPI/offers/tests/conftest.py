import os

import psycopg2
import pytest
from FastAPI.config import BASE_DIR, PG_DB, TEST_PG_DB
from FastAPI.main import app
from fastapi.testclient import TestClient


@pytest.fixture
def client(db):
    with TestClient(app) as client:
        yield client


@pytest.fixture
def auth_token(client, user_marian):
    data = {"username": "marian.zozulia@gmail.com", "password": "apple-b@nana-f1re"}
    r = client.post("auth/login", data=data)
    auth_token = r.json()["access_token"]
    return {"Authorization": f"Bearer {auth_token}"}


@pytest.fixture
def _create_test_db():
    conn = psycopg2.connect(
        database=PG_DB,
        user="phoqer",
        password="apple-b@nana-f1re",
        host="localhost",
        port="5432",
    )
    conn.autocommit = True
    try:
        with conn:
            with conn.cursor() as curs:
                curs = conn.cursor()
                create_query = f"CREATE database {TEST_PG_DB};"
                drop_query = f"DROP DATABASE IF EXISTS {TEST_PG_DB};"
                curs.execute(drop_query)
                curs.execute(create_query)
                yield
                curs.execute(drop_query)
    finally:
        conn.close()


@pytest.fixture
def _migrate(_create_test_db):
    conn = psycopg2.connect(
        database=TEST_PG_DB,
        user="phoqer",
        password="apple-b@nana-f1re",
        host="localhost",
        port="5432",
    )
    try:
        with conn:
            with conn.cursor() as curs:
                migrations_dir = os.path.join(BASE_DIR, "migrations")
                migration_files = os.listdir(migrations_dir)
                migration_files.sort()
                for migration_file_name in migration_files:
                    if migration_file_name.split(".")[-2] == "up":
                        migration_file_path = os.path.join(
                            migrations_dir, migration_file_name
                        )
                        with open(migration_file_path) as file:
                            query = file.read()
                            curs.execute(query)
    finally:
        conn.close()


@pytest.fixture
def db(_migrate):
    conn = psycopg2.connect(
        database=TEST_PG_DB,
        user="phoqer",
        password="apple-b@nana-f1re",
        host="localhost",
        port="5432",
    )
    conn.autocommit = True
    try:
        with conn:
            with conn.cursor() as curs:
                yield curs
    finally:
        conn.close()


@pytest.fixture
def country_ukraine(db):
    query = "INSERT INTO countries (slug) VALUES (%s)"
    values = ("ukraine",)
    db.execute(query, values)
    return "ukraine"


@pytest.fixture
def country_poland(db):
    query = "INSERT INTO countries (slug) VALUES (%s)"
    values = ("poland",)
    db.execute(query, values)
    return "poland"


@pytest.fixture
def city_kiev(db, country_ukraine):
    query = "INSERT INTO cities (slug, countries_slug) VALUES (%s, %s)"
    values = ("kyiv", "ukraine")
    db.execute(query, values)
    return "kyiv"


@pytest.fixture
def city_warsaw(db, country_ukraine):
    query = "INSERT INTO cities (slug, countries_slug) VALUES (%s, %s)"
    values = ("warsaw", "poland")
    db.execute(query, values)
    return "warsaw"


@pytest.fixture
def user_marian(db, country_poland, city_warsaw):
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
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    values = (
        "1",  # id
        "$2b$12$6DVnORNuohV8olN5cNzqKufCRGGnUYiYZJkjAjPcAt8roFRGyo4/e",  # password
        "2021-07-07 11:35:14.330296+00",  # last_login
        False,  # is_superuser
        "Marian",  # first_name
        "Zozulia",  # last_name
        False,  # is_staff
        True,  # is_active
        "2021-03-09 00:00:00+00",  # date_joined
        "Made on Earth by humans... Currently hanging out in Warsaw",  # bio
        "1997-11-06",  # birth_date
        "marian.zozulia@gmail.com",  # email
        "http://phoqer.com/mediafiles/"
        "0f13df9c-772c-4216-b6e0-7894cdaaa2dd-2021-06-14_15.42.25.jpg",  # profile_img
        "poland",  # country
        "warsaw",  # city
    )
    db.execute(query, values)
    return "1"


@pytest.fixture
def user_egor(db, country_ukraine, city_kiev):
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
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    values = (
        "2",  # id
        "$2b$12$6DVnORNuohV8olN5cNzqKufCRGGnUYiYZJkjAjPcAt8roFRGyo4/e",  # password
        "2020-07-07 11:35:14.330296+00",  # last_login
        False,  # is_superuser
        "Egor",  # first_name
        "Leletsky",  # last_name
        False,  # is_staff
        True,  # is_active
        "2020-03-09 00:00:00+00",  # date_joined
        "Nie mam opisu profilu i co ty na to ?",  # bio
        "1997-03-19",  # birth_date
        "fatamorganaa933@gmail.com",  # email
        None,  # profile_img
        "ukraine",  # country
        "kyiv",  # city
    )
    db.execute(query, values)
    return "2"


@pytest.fixture
def categoty_technics(db):
    query = """
    INSERT INTO categories_parentcategories (
        image,
        is_active,
        priority,
        slug,
        icon_image)
    VALUES (%s, %s, %s, %s, %s)"""
    values = (
        "http://phoqer.com/mediafiles/"
        "cfd89389-3dcd-4581-aafc-97b5fbb83ba7-техника.jpg",  # image
        True,  # is_active
        "1",  # priority
        "technics",  # slug
        "technics",  # icon_image
    )
    db.execute(query, values)
    return "slug"


@pytest.fixture
def sub_categoty_consoles(db, categoty_technics):
    query = """
    INSERT INTO categories_childcategories (
        slug,
        parent_id,
        icon_image)
    VALUES (%s, %s, %s)"""
    values = (
        "consoles",  # slug
        "technics",  # parent_id
        "consoles",  # icon_image
    )
    db.execute(query, values)
    return "consoles"


@pytest.fixture
def sub_category_phones(db, categoty_technics):
    query = """
    INSERT INTO categories_childcategories (
        slug,
        parent_id,
        icon_image)
    VALUES (%s, %s, %s)"""
    values = (
        "phones",  # slug
        "technics",  # parent_id
        "phones",  # icon_image
    )
    db.execute(query, values)
    return "phones"


@pytest.fixture
def offer_ps4(
    db, user_marian, categoty_technics, sub_categoty_consoles, country_poland, city_warsaw
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
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    RETURNING id"""
    values = (
        "warsaw",  # city
        "http://phoqer.com/mediafiles/"
        "52cade24-63d6-4f04-bf8c-34489d0c67f1-2368.png",  # cover_image
        "PLN",  # currency
        "500",  # deposit_val
        "Konsola Sony PlayStation 4 Nowa!",  # description
        False,  # doc_needed
        "Zdęcie dowodu osobistego",  # extra_requirements
        "a30b8a1e-1c60-4bbc-ac3d-37df2d224000",  # id
        True,  # is_deliverable
        "100",  # price
        "2022-01-01",  # promote_til_date
        "2021-05-21",  # pub_date
        "ACTIVE",  # status
        "SONY PlayStation 4",  # title
        "1",  # views
        "1",  # author_id
        "technics",  # category_id
        "consoles",  # sub_category_id
        "100",  # max_rent_period
        "3",  # min_rent_period
        "poland",  # country
        "1",  # items_amount
        "DAY",  # rental_period
    )
    db.execute(query, values)
    return "a30b8a1e-1c60-4bbc-ac3d-37df2d224000"


@pytest.fixture
def offer_iphone12(
    db, user_egor, categoty_technics, sub_category_phones, country_ukraine, city_kiev
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
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    RETURNING id"""
    values = (
        "kyiv",  # city
        "http://phoqer.com/mediafiles/"
        "52cade24-63d6-4f04-bf8c-34489d0c67f1-2369.png",  # cover_image
        "PLN",  # currency
        "200",  # deposit_val
        "Nowy Iphone 12!",  # description
        False,  # doc_needed
        "Zdęcie dowodu osobistego",  # extra_requirements
        "a30b8a1e-1c60-4bbc-ac3d-37df2d224001",  # id
        True,  # is_deliverable
        "200",  # price
        "2022-01-01",  # promote_til_date
        "2021-05-21",  # pub_date
        "ACTIVE",  # status
        "Iphone 12",  # title
        "1101",  # views
        "2",  # author_id
        "technics",  # category_id
        "phones",  # sub_category_id
        "7",  # max_rent_period
        "1",  # min_rent_period
        "ukraine",  # country
        "1",  # items_amount
        "DAY",  # rental_period
    )
    db.execute(query, values)
    return "a30b8a1e-1c60-4bbc-ac3d-37df2d224001"


@pytest.fixture
def chat_marian_egor(db, user_marian, user_egor, offer_ps4):
    query = """
    INSERT INTO chats (
        chat_id,
        author_id,
        client_id,
        offer_id,
        creation_datetime,
        is_done)
    VALUES (%s, %s, %s, %s, %s, %s)
    RETURNING offer_id
    """
    values = (
        "1",  # chat_id
        user_egor,  # author_id
        user_egor,  # client_id
        offer_ps4,  # offer_id
        "2021-06-21 07:52:21.609079+00",  # creation_datetime
        False,  # is_done
    )
    db.execute(query, values)
    return "1"
