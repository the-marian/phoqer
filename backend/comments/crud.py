from typing import Union, List, Dict

from databases.backends.postgres import Record

from comments.database import database
from comments.schemas import CommentRequest


async def create_comment(comment: CommentRequest, author_id: int) -> None:
    query = f'''
        INSERT INTO comments_comment (pub_date, body, author_id, offer_id, replies_id)
        VALUES (current_date, :body, :author_id, :offer_id, :replies_id)
        '''
    values = {
        "body": comment.body,
        "author_id": author_id,
        "offer_id": comment.offer_id,
        "replies_id": comment.replies_id
    }

    await database.execute(query=query, values=values)


async def get_user_id(token: str) -> Union[int, None]:
    query = "SELECT user_id FROM authtoken_token WHERE key = :key"
    row = await database.fetch_one(query=query, values={'key': token})
    return row.get('user_id')


async def get_comments_list(offer_id: str) -> List[Record]:
    query = "SELECT * FROM comments_comment WHERE offer_id = :offer_id"
    return await database.fetch_all(query=query, values={'offer_id': offer_id})


async def get_like_map(offer_id: str) -> Dict[int, int]:
    query = """
    SELECT comment_id, COUNT(author_id) AS likes_count FROM comments_like
    WHERE comment_id IN (select id from comments_comment where offer_id=:offer_id) GROUP BY comment_id
    """
    likes = await database.fetch_all(query=query, values={'offer_id': offer_id})
    return {
        like['comment_id']: like['likes_count']
        for like in likes
    }


async def get_dislike_map(offer_id: str) -> Dict[int, int]:
    query = """
    SELECT comment_id, COUNT(author_id) AS dislikes_count FROM comments_dislike
    WHERE comment_id IN (select id from comments_comment where offer_id=:offer_id) GROUP BY comment_id
    """
    dislikes = await database.fetch_all(query=query, values={'offer_id': offer_id})
    return {
        dislike['comment_id']: dislike['dislikes_count']
        for dislike in dislikes
    }


async def delete_comment(comment_id: str) -> None:
    query = "DELETE FROM comments_comment WHERE id = :comment_id"
    await database.execute(query=query, values={'comment_id': comment_id})


async def delete_like(author_id: int, comment_id: int) -> None:
    query = "DELETE FROM comments_like WHERE comment_id = :comment_id AND author_id = :author_id"
    await database.execute(query=query, values={'author_id': author_id, 'comment_id': comment_id})


async def delete_dislike(author_id: int, comment_id: int) -> None:
    query = "DELETE FROM comments_dislike WHERE comment_id = :comment_id AND author_id = :author_id"
    await database.execute(query=query, values={'author_id': author_id, 'comment_id': comment_id})


async def create_like(author_id: int, comment_id: int) -> None:
    query = """
    INSERT INTO comments_like (author_id, comment_id)
    SELECT :author_id, :comment_id
    WHERE NOT EXISTS (SELECT TRUE FROM comments_like WHERE author_id = :author_id AND comment_id = :comment_id)
    """
    await database.execute(query=query, values={'author_id': author_id, 'comment_id': comment_id})


async def create_dislike(author_id: int, comment_id: int) -> None:
    query = """
        INSERT INTO comments_dislike (author_id, comment_id)
        SELECT :author_id, :comment_id
        WHERE NOT EXISTS (SELECT TRUE FROM comments_dislike WHERE author_id = :author_id AND comment_id = :comment_id)
        """
    await database.execute(query=query, values={'author_id': author_id, 'comment_id': comment_id})
