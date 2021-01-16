from freezegun import freeze_time
from rest_framework import status


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
def test_comments_create(api_client, authenticated_client, offer):
    data = {'body': 'This is a brand new comment'}
    response = authenticated_client.post('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/', data)
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data == {'body': 'This is a brand new comment'}

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.json()[0] == {
        'id': 1,
        'author': 'Marian Zozulia',
        'body': 'This is a brand new comment',
        'dislikes': 0,
        'images': [],
        'likes': 0,
        'offer': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
        'pub_date': '2020-10-29',
        'replies': []
    }


def test_comments_delete_unauthorized(api_client):
    response = api_client.delete('/api/v1/comments/4/')
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_comments_delete_404(authenticated_client):
    response = authenticated_client.delete('/api/v1/comments/4/')
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_comments_delete(api_client, authenticated_client, comment_1):
    response = authenticated_client.delete('/api/v1/comments/1/')
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')

    assert response.json() == []


def test_comments_reply_404(api_client, authenticated_client, comment_2):
    data = {'body': 'This is response on comment with id 3'}
    response = authenticated_client.post('/api/v1/comments/3/reply/', data)
    assert response.status_code == status.HTTP_404_NOT_FOUND


@freeze_time("2020-10-29")
def test_comments_reply(api_client, authenticated_client, comment_2):
    data = {'body': 'This is response on comment with id 1'}
    response = authenticated_client.post('/api/v1/comments/1/reply/', data)
    assert response.status_code == status.HTTP_201_CREATED

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')

    assert response.json() == [
        {
            'id': 1,
            'author': 'Kseniia Pashkovska',
            'body': 'Super puper duper cool offer',
            'dislikes': 0,
            'images': [],
            'likes': 0,
            'offer': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
            'pub_date': '2020-10-29',
            'replies': [
                {
                    'id': 2,
                    'author': 'Marian Zozulia',
                    'body': 'This is response on comment with id 1',
                    'dislikes': 0,
                    'images': [],
                    'likes': 0,
                    'offer': '1b261f53-8e3b-4c14-abe6-5824c5d8b66c',
                    'pub_date': '2020-10-29',
                    'replies': []
                }
            ]
        }
    ]


def test_comments_like_401(api_client, comment_2):
    response = api_client.patch('/api/v1/comments/1/like/')
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_comments_like_authenticated_client(authenticated_client, comment_2):
    response = authenticated_client.patch('/api/v1/comments/1/like/')
    assert response.status_code == status.HTTP_200_OK


def test_comments_like_dislike_logic_1(api_client, authenticated_client, comment_2):
    """
    what do we have   --> perform like-->   what do we expect
    likes 0                                 likes 1
    dislikes 0                              dislikes 0
    """
    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 0
    assert response.data[0]['dislikes'] == 0

    authenticated_client.patch('/api/v1/comments/1/like/')

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 1
    assert response.data[0]['dislikes'] == 0


def test_comments_like_dislike_logic_2(api_client, authenticated_client, comment_2):
    """
    what do we have   --> perform like-->   what do we expect
    likes 1                                 likes 0
    dislikes 0                              dislikes 0
    """
    authenticated_client.patch('/api/v1/comments/1/like/')

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 1
    assert response.data[0]['dislikes'] == 0

    authenticated_client.patch('/api/v1/comments/1/like/')

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 0
    assert response.data[0]['dislikes'] == 0


def test_comments_like_dislike_logic_3(api_client, authenticated_client, comment_2):
    """
    what do we have   --> perform like-->   what do we expect
    likes 0                                 likes 1
    dislikes 1                              dislikes 0
    """
    authenticated_client.patch('/api/v1/comments/1/dislike/')

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 0
    assert response.data[0]['dislikes'] == 1

    authenticated_client.patch('/api/v1/comments/1/like/')

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 1
    assert response.data[0]['dislikes'] == 0


def test_comments_like_dislike_logic_4(api_client, authenticated_client, comment_2):
    """
    what do we have   --> perform dislike-->   what do we expect
    likes 0                                 likes 0
    dislikes 0                              dislikes 1
    """
    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 0
    assert response.data[0]['dislikes'] == 0

    authenticated_client.patch('/api/v1/comments/1/dislike/')

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 0
    assert response.data[0]['dislikes'] == 1


def test_comments_like_dislike_logic_5(api_client, authenticated_client, comment_2):
    """
    what do we have   --> perform dislike-->   what do we expect
    likes 0                                 likes 0
    dislikes 1                              dislikes 0
    """
    authenticated_client.patch('/api/v1/comments/1/dislike/')
    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 0
    assert response.data[0]['dislikes'] == 1

    authenticated_client.patch('/api/v1/comments/1/dislike/')

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 0
    assert response.data[0]['dislikes'] == 0


def test_comments_like_dislike_logic_6(api_client, authenticated_client, comment_2):
    """
    what do we have   --> perform dislike-->   what do we expect
    likes 1                                 likes 0
    dislikes 0                              dislikes 1
    """
    authenticated_client.patch('/api/v1/comments/1/like/')
    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 1
    assert response.data[0]['dislikes'] == 0

    authenticated_client.patch('/api/v1/comments/1/dislike/')

    response = api_client.get('/api/v1/comments/1b261f53-8e3b-4c14-abe6-5824c5d8b66c/')
    assert response.data[0]['likes'] == 0
    assert response.data[0]['dislikes'] == 1 # test linter