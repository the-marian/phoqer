***Search***

**endpoint**

api/v1/offers/search/

**query Params**

- category=spor (any category slug)
- sub_category=bicycles (any sub_category slug)
- city=Киев (пока-что это просто text_field)
- is_deliverable=true (true тогда API вернет только обьявления, в которых автор указал, что возможна доставка)
- status=(DRAFT|REVIEW|ACTIVE|REJECTED|INACTIVE|IN_RENT|ARCHIVED|FROZEN)
- max_price/min_price=1/100
- max_deposit/min_deposit=1/100
- no_deposit (true тогда API вернет только обьявления, в которых не требуется залога)

    *Ordering*

- ordering=pud_date (ascending)
- ordering=-pud_date (descending) Также работает сортировка по: (views, price, deposit_val). Можно сортировать одновременно по нескольким полям. Пример (ordering=views,price)

seach=Marine ( ищет по полям title и description ) на английском языке не чуствительно к регистру, к сожалению на кирилице чуствительно, это баг который я хз пока как решить

Пример одного такого запроса:
```
http://127.0.0.1:8000/api/v1/offers/search/?category=sport&city=%D0%9A%D0%B8%D0%B5%D0%B2&ordering=-pud_date&seach=Marine&&sub_category=bicycles
```
Вернет вот что:

```
[
    {
        "cover_image": "https://petavasport.kz/wp-content/uploads/2018/05/WhatsApp-Image-2018-05-27-at-17.51.18.jpeg",
        "currency": "UAH",
        "description": "Сдаю в аренду велосипед, стоит без дела жалко добру пропадать",
        "id": "21446b4c-68b9-4ff4-abfe-1a4c921bd34b",
        "is_favorite": false,
        "per": "DAY",
        "price": 100,
        "pud_date": "2020-10-11",
        "title": "Велосипед Marine Four Corners 2020",
        "views": 0
    }
]
```