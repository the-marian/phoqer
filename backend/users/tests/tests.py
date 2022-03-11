import datetime

import pytest

from config import database
from users.crud import get_user_by_id

pytestmark = pytest.mark.asyncio


async def test_user_signup(client):
    post_data = {
        "password": "i_am_hungry",
        "email": "test@phoqer.com",
        "first_name": "Marian",
        "last_name": "Zozulia",
    }
    response = await client.post(
        "/users/signup",
        json=post_data,
    )
    assert response.status_code == 204


async def test_user_already_exist(client, user_marian):
    post_data = {
        "password": "kitty",
        "email": "marian.zozulia@gmail.com",
        "first_name": "Marian",
        "last_name": "Zozulia",
    }
    response = await client.post(
        "/users/signup",
        json=post_data,
    )

    assert response.status_code == 400
    assert response.json() == {
        "detail": "The user with this username already exists in the system"
    }


async def test_logged_in_user_details(client, marian_auth_token):
    response = await client.get("/users/me", headers=marian_auth_token)
    assert response.status_code == 200
    response = response.json()
    response.pop("id")
    assert response == {
        "bio": "Made on Earth by humans... Currently hanging out in Warsaw",
        "birth_date": "1997-11-06",
        "city": "warsaw",
        "communication_rate": 0,
        "country": "poland",
        "date_joined": "2021-03-09",
        "description_rate": 0,
        "dislikes": 0,
        "email": "marian.zozulia@gmail.com",
        "first_name": "Marian",
        "last_activity": "2021-07-07T00:00:00+00:00",
        "last_name": "Zozulia",
        "likes": 0,
        "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
        "response_rate": 0,
        "satisfaction_rate": 0,
    }


async def test_get_user_details(client, user_marian):
    response = await client.get(f"/users/{user_marian}")
    assert response.status_code == 200
    response = response.json()
    response.pop("id")
    assert response == {
        "bio": "Made on Earth by humans... Currently hanging out in Warsaw",
        "birth_date": "1997-11-06",
        "city": "warsaw",
        "communication_rate": 0,
        "country": "poland",
        "date_joined": "2021-03-09",
        "description_rate": 0,
        "dislikes": 0,
        "email": "marian.zozulia@gmail.com",
        "first_name": "Marian",
        "last_activity": "2021-07-07T00:00:00+00:00",
        "last_name": "Zozulia",
        "likes": 0,
        "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
        "response_rate": 0,
        "satisfaction_rate": 0,
    }


async def test_get_short_user_details(client, user_marian):
    response = await client.get(f"/users/short/{user_marian}")
    assert response.status_code == 200
    response = response.json()
    response.pop("id")
    assert response == {
        "city": "warsaw",
        "country": "poland",
        "date_joined": "2021-03-09",
        "first_name": "Marian",
        "last_activity": "2021-07-07T00:00:00+00:00",
        "last_name": "Zozulia",
        "profile_img": "http://phoqer.com/mediafiles/dicpic.jpg",
    }


async def test_partial_update_user(client, igor_auth_token, city_warsaw, user_igor):
    patch_data = {
        "bio": "new bio",
        "birth_date": "1997-11-06",
        "city": "warsaw",
        "country": "poland",
        "first_name": "Marian",
        "last_name": "Zozulia",
        "profile_img": "https://example.com/dic_pic_2.jpeg",
    }
    response = await client.patch("/users/me", json=patch_data, headers=igor_auth_token)
    assert response.status_code == 204
    db_response = dict(await get_user_by_id(user_igor))
    db_response.pop("id")
    assert db_response == {
        "bio": "new bio",
        "birth_date": datetime.date(1997, 11, 6),
        "city": "warsaw",
        "country": "poland",
        "date_joined": datetime.datetime(2019, 11, 9, 0, 0, tzinfo=datetime.timezone.utc),
        "email": "igorrr.thlw5@gmail.com",
        "first_name": "Marian",
        "last_activity": datetime.datetime(
            2021, 7, 7, 0, 0, tzinfo=datetime.timezone.utc
        ),
        "last_name": "Zozulia",
        "profile_img": "https://example.com/dic_pic_2.jpeg",
    }


async def test_delete_user(client, marian_auth_token, user_marian):
    response = await client.delete("/users/me", headers=marian_auth_token)
    assert response.status_code == 204


async def test_check_user_offers(client, marian_auth_token, user_marian):
    response = await client.delete("/users/me", headers=marian_auth_token)
    assert response.status_code == 204
    query = f"SELECT * FROM offers_offer WHERE author_id = :{user_marian}"
    assert await database.fetch_all(query=query) == []


async def test_check_user_comments(client, marian_auth_token, user_marian, comment_marian, offer_ps4):
    response = await client.get(f"/comments/{offer_ps4}", headers=marian_auth_token)
    assert response.json() == [{
        'author_id': 1,
        'body': 'chis sdhsdohjvb fniuwef nfoinfoifn nflksfnpq[bvcvndfhghhfinvbo '
                'ibfibwfkb jbihohni fbiwbfibwifb',
        'dislike': False,
        'dislikes': 0,
        'first_name': 'Marian',
        'id': 1,
        'images': [],
        'last_name': 'Zozulia',
        'like': False,
        'likes': 0,
        'offer_id': 'a30b8a1e-1c60-4bbc-ac3d-37df2d224000',
        'profile_img': 'http://phoqer.com/mediafiles/dicpic.jpg',
        'pub_date': '2022-01-01',
        'replies': [],
        'replies_id': None}]
    response = await client.delete("/users/me", headers=marian_auth_token)
    assert response.status_code == 204
    query = f"SELECT * FROM comments_comment WHERE author_id = :{user_marian}"
    assert await database.fetch_all(query=query) == []

# Такс, выхожу в эфир с новой весточкой) Новостей у меня не много и это по большей части
# для Даны, потому что после того как она прочитала прошлое моё сообщение начала
# переживать. Первое, хочу сказать по поводу призыва. В этом плане можно не переживать -
# меня чисто физически не могут призвать, потому что я по факту уже призван. Я отчасти
# военный. Но к счастью не все военные воюют на передовой, есть куча других должностей -
# психологи, разведчики, аналитики, финансисты - вы сами прекрасно знаете кто я. По факту
# мы общественно-военная организация, и наша работа не подразумевает наше ипользование в
# боевых действиях, мы занимаемся и специализируемся на другом. Поэтому меня никто не
# может призвать - я в полнейшей безопасности. Правда, вам не о чем переживать.
# Второе, по поводу дальнейших планов. В этом плане я не могу дать каких-либо прогнозов,
# потому что сейчас военное время, и я думаю вы сами понимаете что может произойти всё
# что угодно и тогда уже придётся действовать по факту, так что тут планировать что либо
# бесполезно. Но, у нас уже есть пару резервных вариантов, так что всё хорошо. В случае
# чего - мы сразу же переедем. В любом случае вы сразу же об этом узнаете. С организацией
# тут реально были проблемы - и это то с чего я офигел, учитывая то, где мы работаем. График
# душа, дежурства - всякие бытовые штучки, ничего серьёзного, но что бы их наладить ушло
# какое-то время, но сейчас всё супер - у меня всё шикарно и есть все возможности для того
# что бы работать и развиваться) У нас двухразовое питание, есть горячая вода, стиралка,
# мягкие кровати, хороший интернет - в городе вся инфраструктура находится в 5 минутах от
# нас (Если не верите - можете глянуть на карте, адрес я вам уже давал). Поэтому вообще
# грех жаловаться. Теперь расскажу с чем были связаны наши прошлые переезды.
# Дело в том, что те 2 пункта в которых мы останавливались по факту были военными базами,
# а как вы знаете их очень активно бомбили, поэтому было принято решение выбрать что-то
# более безопасное. Опять таки, вы можете глянуть где я и что тут находится - адрес у вас
# есть. Поэтому тут я правда нахожусь в полной безопасности и вам ПРАВДА не о чем переживать.
# Кстати, в резервных вариантах тоже по условиям всё шикарно - даже немного лучше чем тут)
# Поэтому на санных матрасах я больше спать не буду) И скажу ещё раз - воевать меня никто
# не отправит, даже при нехватке людей. О чём тут говорить - у нас большая половинна людей
# никогда оружие в руках не держала) Так что правда, всё супер)
# На этом пожалуй буду заканчивать, надеюсь у меня получилось успокоить вас - никаких причин
# для переживаний нет. Я очень жду встречи с вами. Со всеми вами.
# Очень вас люблю.
