from fastapi import status


def test_get_countries(client):
    response = client.get("locations/countries/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [{"slug": "ukraine"}, {"slug": "poland"}]


def test_get_cities_for_ukraine(client):
    response = client.get("locations/cities/ukraine/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {"slug": "lviv"},
        {"slug": "chernihiv"},
        {"slug": "kharkiv"},
        {"slug": "odessa"},
        {"slug": "dnipro"},
        {"slug": "donetsk"},
        {"slug": "zaporizhzhia"},
        {"slug": "mykolaiv"},
        {"slug": "mariupol"},
        {"slug": "luhansk"},
        {"slug": "vinnytsia"},
        {"slug": "sevastopol"},
        {"slug": "simferopol"},
        {"slug": "kherson"},
        {"slug": "poltava"},
        {"slug": "cherkasy"},
        {"slug": "khmelnytskyi"},
        {"slug": "kryvyi_rih"},
    ]


def test_cities_for_poland(client):
    response = client.get("locations/cities/poland/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {"slug": "warsaw"},
        {"slug": "krakow"},
        {"slug": "lodz"},
        {"slug": "wroclaw"},
        {"slug": "poznan"},
        {"slug": "gdansk"},
        {"slug": "szczecin"},
        {"slug": "bydgoszcz"},
        {"slug": "lublin"},
        {"slug": "katowice"},
    ]
