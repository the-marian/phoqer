import datetime
from typing import Mapping, Optional
from fastapi import Depends

from pydantic import EmailStr

from config import database
from users.schemas import UserPartialUpdate
from utils import get_current_user


async def user_exist(email: EmailStr) -> bool:
    query = "SELECT TRUE FROM users_user WHERE email = :email"
    return bool(await database.fetch_one(query=query, values={"email": email}))


async def create_user(
    email: str,
    first_name: str,
    last_name: str,
    hashed_password: Optional[str] = None,
    bio: str = "",
    birth_date: Optional[str] = None,
    city: Optional[str] = None,
    country: Optional[str] = None,
    is_active: bool = False,
    is_staff: bool = False,
    is_superuser: bool = False,
    profile_img: Optional[str] = None,
    account_type: str = "INTERNAL",
) -> None:
    query = """
    INSERT INTO users_user (
        password,
        last_login,
        city,
        country,
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
        account_type)
    VALUES (
        :password,
        current_date,
        :city,
        :country,
        :is_superuser,
        :first_name,
        :last_name,
        :is_staff,
        :is_active,
        current_date,
        :bio,
        :birth_date,
        :email,
        :profile_img,
        :account_type)
    """
    values = {
        "bio": bio,
        "birth_date": birth_date,
        "city": city,
        "country": country,
        "email": email,
        "first_name": first_name,
        "is_active": is_active,
        "is_staff": is_staff,
        "is_superuser": is_superuser,
        "last_name": last_name,
        "password": hashed_password,
        "profile_img": profile_img,
        "account_type": account_type,
    }
    await database.execute(query=query, values=values)


async def activate_user(email: EmailStr) -> None:
    query = "UPDATE users_user SET is_active = TRUE WHERE email = :email"
    await database.execute(query=query, values={"email": email})


async def get_user_by_id(user_id: int) -> Mapping:
    query = """
    SELECT
        bio,
        birth_date,
        city,
        country,
        date_joined,
        email,
        first_name,
        id,
        last_login AS last_activity,
        last_name,
        profile_img
    FROM users_user
    WHERE id = :id
    """
    return await database.fetch_one(query=query, values={"id": user_id}) or {}


async def get_user_by_email(email: str) -> Mapping:
    query = """
    SELECT
        account_type,
        bio,
        birth_date,
        city,
        country,
        date_joined,
        email,
        first_name,
        id,
        is_active,
        is_staff,
        is_superuser,
        last_login,
        last_name,
        password,
        profile_img
    FROM users_user
    WHERE email = :email
    """
    user = await database.fetch_one(query=query, values={"email": email})
    if not user:
        return {}
    return user


async def get_short_user(user_id: int) -> Mapping:
    query = """
    SELECT
        city,
        country,
        date_joined,
        first_name,
        id,
        last_login AS last_activity,
        last_name,
        profile_img
    FROM users_user
    WHERE id = :id
    """
    return await database.fetch_one(query=query, values={"id": user_id}) or {}


async def partial_update_user(
    user_id: int,
    update_user_data: UserPartialUpdate,
    stored_user_data: Mapping,
) -> None:
    stored_user_model = UserPartialUpdate(**stored_user_data)
    update_data = update_user_data.dict(exclude_unset=True)
    updated_user = stored_user_model.copy(update=update_data)
    query = """
    UPDATE users_user
    SET
        bio = :bio,
        birth_date = :birth_date,
        city = :city,
        country = :country,
        first_name = :first_name,
        last_name = :last_name,
        profile_img = :profile_img
    WHERE id = :user_id
    """
    values = {
        "bio": updated_user.bio,
        "birth_date": updated_user.birth_date,
        "city": updated_user.city,
        "country": updated_user.country,
        "first_name": updated_user.first_name,
        "last_name": updated_user.last_name,
        "profile_img": updated_user.profile_img,
        "user_id": user_id,
    }
    await database.execute(query=query, values=values)


async def update_last_login(user_id: int) -> None:
    query = "UPDATE users_user SET last_login = :current_timestamp WHERE id = :user_id"
    await database.execute(
        query=query,
        values={"user_id": user_id, "current_timestamp": datetime.datetime.now()},
    )


async def delete_user_offers(author_id: int) -> None:
    query = "DELETE FROM offers_offer WHERE author_id = :user_id"
    await database.execute(query=query, values={"user_id": author_id})


async def delete_user_comments(author_id: int) -> None:
    query = "DELETE FROM comments_comment WHERE author_id = :user_id"
    await database.execute(query=query, values={"user_id": author_id})


@database.transaction()
async def delete_user(user_id: int, author_id: int) -> None:
    await delete_user_offers(author_id)
    await delete_user_comments(author_id)
    query = "DELETE FROM users_user WHERE id = :user_id"
    await database.execute(query=query, values={"user_id": user_id})

# Ну что ж, вот наконец и выдалась возможность написать) На самом деле тут не будет прям какой-то
# очень важной инфы, просто что б вы понимали где я и как я. Начну с того, что телеграмм скорее всего
# чекается вражескими службами - это конечно неточно, но на всякий случай я бы предпочёл сообщить эту инфу
# тут. Я сейчас нахожусь в безопасности в городе Самбор - это Львовская область. Тут какой-то лицей-интернат
# в который нас поселили. Тут очень много нашего народа, наверное человек 80 +-. Нас живёт 10 человек в комнате
# - все ребята с моего отдела, я всех знаю, так что в этом плане всё супер) Нас кормят, у меня мягкая кровать,
# так что грех жаловаться на что либо. Но перед тем как добраться сюда меня знатно покидало. Сначала я ехал
# в Винницу, там был временный пункт. Мы пробыли там 4 часа, из которых 2 я поспал в машине. После воздушной
# тревоги мы отправились в Немиров - это была следующая наша точка. Там какой-то санаторий, который находился
# реально в ебенях. На самом деле то не саноторий, а военная база. Мы там переночевали и двинулись дальше,
# потому что оставаться было очень опасно. Спали на матрасах и мокром полу. Утром выехали на место где находмся
# сейчас. Сколько ещё мы тут будем - не знаю, но на всякий случай у нас уже есть резервное место. То где мы
# находимся - не военный объект, и мы тут под прекрытием, хотя вся эта конспирация просто курам насмех. Вот
# серьёзно - я прям очень разочаровался. Изначально когда мы сюда заехали, местные прознали про то, что сюда
# заехало около 80 мужиков, и поднялся кипишь почему мы не воюем, а прячемся. Первые несколько ночей думали что
# к нам сюда с вилами люди придут, но тьфу тьфу, всё обошлось. Это кстати была причина почему я боялся идти за
# ноутом - почта в 2х километрах от нас. Боялся что меня просто схватят. Но опять таки, всё хорошо.
#     Мы вооружены. У меня есть личный автомат и пистолет. Иногда приходится
# их чистить от масла, потому что прям жопа. Я очень надеюсь что нам не придётся их использовать, но если запахнет
# жаренным - у меня есть чем защищаться, а стреляю я хорошо. Как-то всё очень странно стало - жизнь очень круто
# повернулась за такое короткое время. ОЧень хочется домой. Очень скучаю за Даной. Спасибо ещё раз что приютил
# моих девочек, и спасибо что заботишься о них - они правда для меня очень важны. Даже не могу передать что я
# почувствовал когда ты сказал что они у тебя и в безопасности. Все те дни меня очень трясло и я невероятно
# нервничал, но в итоге всё отлично, и я очень тебе благодарен - спасибо.
# Да, кстати - можешь Дане показать это сообщение, только не говори ей про оружие - я не хочу что бы она
# лишний раз волновалась. Хотя, я  думаю что она и так догадывается  - от
# неё тяжело что либо утаить) Тут сейчас я занимаюсь в основном кибер работой. Не буду говорить чем именно, но
# думаю ты +- понимаешь. Информационная война тоже идёт полным ходом. На этом буду заканчивать -  не хочу грузить
# но если вдруг ты хочешь что-то такое спросить, то в таком формате было бы шикарно. Ох, когда всё закончится
# у нас будет долгий разговор) С нетерпением жду этого - я безумно скучаю за вами ребята. Скоро увидимся.
# Люблю вас
