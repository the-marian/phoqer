import pytest

from freezegun import freeze_time
from categories.models import ParentCategories, ChildCategories
from comments.models import Comment
from offers.models import Offer
from users.models import User


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture
def author_1(db):
    return User.objects.create_user(first_name='Marian', last_name='Zozulia', email='maric0naric@gmail.com',
                                    password='bla bla bla 123')


@pytest.fixture
def author_2(db):
    return User.objects.create_user(first_name='Kseniia', last_name='Pashkovska', email='pashkovskax@gmail.com',
                                    password='bla bla bla 123')


@pytest.fixture
def authenticated_client(db, author_1):
    from rest_framework.test import APIClient
    client = APIClient()
    client.login(username='maric0naric@gmail.com', password='bla bla bla 123')
    return client


@pytest.fixture
def category(db):
    return ParentCategories.objects.create(name='Phones', slug='phones', image='https://example.com/phone.jpeg',
                                           is_active=True, priority=1)


@pytest.fixture
def sub_category(db, category):
    return ChildCategories.objects.create(name='IPhones', slug='iphones', parent=category)


@pytest.fixture
def offer(db, author_1, category, sub_category):
    return Offer.objects.create(
        author=author_1,
        category=category,
        city='Kiev',
        cover_image='https://example.com/phone.jpeg',
        currency='UAH',
        description='New Phone',
        id='1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
        doc_needed=False,
        is_deliverable=True,
        price='499',
        status='ACTIVE',
        sub_category=sub_category,
        title='Iphone 12')


@pytest.fixture
@freeze_time("2020-10-29")
def reply_on_comment_1(db, offer, author_2):
    return Comment.objects.create(
        author=author_2,
        body='This is a test reply on comment 1',
        offer=offer
    )


@pytest.fixture
@freeze_time("2020-10-29")
def comment_1(db, offer, author_1, reply_on_comment_1):
    return Comment.objects.create(
        author=author_1,
        body='This is a test comment with reply',
        offer=offer,
        replies=reply_on_comment_1
    )


@pytest.fixture
@freeze_time("2020-10-29")
def comment_2(db, offer, author_2):
    return Comment.objects.create(
        author=author_2,
        body='Super puper duper cool offer',
        offer=offer,
    )
