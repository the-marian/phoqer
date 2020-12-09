from rest_framework import status
from freezegun import freeze_time


def test_commets_endpoints(api_client, comment_1, comment_2):
    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.status_code == status.HTTP_200_OK


def test_comments_list(api_client, comment_1, comment_2):
    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.json() == [
        {
            'id': 1,
            'author': 'Kseniia Pashkovska',
            'body': 'This is a test reply on comment 1',
            'dislikes': 0,
            'images': [],
            'likes': 0,
            'offer': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
            'pub_date': '2020-10-29',
            'replies': [
                {
                    'id': 2,
                    'author': 'Marian Zozulia',
                    'body': 'This is a test comment with reply',
                    'dislikes': 0,
                    'images': [],
                    'likes': 0,
                    'offer': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
                    'pub_date': '2020-10-29',
                    'replies': []
                }
            ]
        },
        {
            'id': 3,
            'author': 'Kseniia Pashkovska',
            'body': 'Super puper duper cool offer',
            'dislikes': 0,
            'images': [],
            'likes': 0,
            'offer': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
            'pub_date': '2020-10-29',
            'replies': []
        }
    ]

@freeze_time("2020-10-29")
def test_comments_create(api_client, authenticated_client, comment_1, comment_2):
    data = {'body': 'This is a brand new comment'}
    response = authenticated_client.post('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/',
                                         data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data == {'body': 'This is a brand new comment'}

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.json()[2] == {
        'id': 4,
        'author': 'Marian Zozulia',
        'body': 'This is a brand new comment',
        'dislikes': 0,
        'images': [],
        'likes': 0,
        'offer': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
        'pub_date': '2020-10-29',
        'replies': []
    }


def test_comments_delete(api_client, authenticated_client, comment_1, comment_2):
    data = {'body': 'This is a test for Igor'}
    response = api_client.get('docs.google.com/document/d/1WvUOqeDvSuRfb2zKFUi55IFvFo_dVo2w94V4VB_NbXg')
    assert response.status_code == 666
