import sqlite3
from typing import Optional, Union, List

from asyncpg import ForeignKeyViolationError
from fastapi import APIRouter, HTTPException, status, Header, Depends, Response

from comments import crud
from comments.schemas import CommentRequest, CommentResponse

router = APIRouter(
    prefix='/comments',
    tags=['comments'],
)


async def get_current_user(authorization: Optional[str] = Header(None)) -> Union[int, None]:
    if authorization:
        token = authorization.split(' ')[-1]
        try:
            user_id = await crud.get_user_id(token)
            if user_id:
                return user_id
            elif user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail=f"Token does not exist"
                )
        except sqlite3.OperationalError as error:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Problem occurred during comment creation: {error}"
            )
    elif authorization is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No Authorisation header supplied")


@router.get("/{offer_id}", response_model=List[CommentResponse])
async def list_comments(offer_id: str):
    comments_list = await crud.get_comments_list(offer_id)
    like_map = await crud.get_like_map(offer_id)
    dislike_map = await crud.get_dislike_map(offer_id)
    comments_map = {
        comment['id']: CommentResponse(
            **comment,
            likes=like_map.get(comment['id'], 0),
            dislikes=dislike_map.get(comment['id'], 0)
        )
        for comment in comments_list
    }
    for comment in comments_map.values():
        if parent_id := comment.replies_id:
            comments_map.get(parent_id).replies.append(comment)
    return [comment for comment in comments_map.values() if not comment.replies_id]


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
async def create_comment(
        comment: CommentRequest,
        author_id: int = Depends(get_current_user)
):
    try:
        await crud.create_comment(comment, author_id)
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except ForeignKeyViolationError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"There are no Offer with this id in Database. {error}"
        )


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
        comment_id: int,
        author_id: int = Depends(get_current_user)
):
    await crud.delete_comment(comment_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch("/{comment_id}/like", status_code=status.HTTP_204_NO_CONTENT)
async def like_comment(comment_id: int, author_id: int = Depends(get_current_user)):
    await crud.delete_dislike(author_id, comment_id)
    await crud.create_like(author_id, comment_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch("/{comment_id}/dislike", status_code=status.HTTP_204_NO_CONTENT)
async def dislike_comment(comment_id: int, author_id: int = Depends(get_current_user)):
    await crud.delete_like(author_id, comment_id)
    await crud.create_dislike(author_id, comment_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
