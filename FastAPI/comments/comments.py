from typing import List, Optional

from asyncpg import ForeignKeyViolationError
from fastapi import APIRouter, Depends, HTTPException, Response, status
from FastAPI.comments import crud
from FastAPI.comments.schemas import CommentReply, CommentRequest
from FastAPI.utils import get_current_user, get_current_user_or_none

router = APIRouter(
    prefix="/comments",
    tags=["comments"],
)


@router.get("/{offer_id}", response_model=List[CommentReply])
async def list_comments(
    offer_id: str, author_id: Optional[int] = Depends(get_current_user_or_none)
) -> List[CommentReply]:
    author_likes_map = {}
    author_dislikes_map = {}
    comment_images_map = await crud.get_comment_images_map(offer_id)
    if author_id:
        author_likes_map = await crud.get_author_likes_map(author_id, offer_id)
        author_dislikes_map = await crud.get_author_dislikes_map(author_id, offer_id)
    comments_list = await crud.get_comments_list(offer_id)
    like_map = await crud.get_like_map(offer_id)
    dislike_map = await crud.get_dislike_map(offer_id)
    comments_map = {
        comment["id"]: CommentReply(
            **comment,
            likes=like_map.get(comment["id"], 0),
            dislikes=dislike_map.get(comment["id"], 0),
            like=author_likes_map.get(comment["id"], False),
            dislike=author_dislikes_map.get(comment["id"], False),
            images=comment_images_map.get(comment["id"], []),
        )
        for comment in comments_list
    }
    for comment in comments_map.values():
        if parent_id := comment.replies_id:
            comments_map[parent_id].replies.append(comment)
    return [comment for comment in comments_map.values() if not comment.replies_id]


@router.post("", status_code=status.HTTP_204_NO_CONTENT)
async def create_comment(
    comment: CommentRequest, author_id: int = Depends(get_current_user)
) -> Response:
    try:
        await crud.create_comment(comment=comment, author_id=author_id)
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    except ForeignKeyViolationError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"There are no Offer with this id in Database. {error}",
        )


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
    comment_id: int, author_id: int = Depends(get_current_user)
) -> Response:
    await crud.delete_comment(comment_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch("/{comment_id}/like", status_code=status.HTTP_204_NO_CONTENT)
async def like_comment(
    comment_id: int, author_id: int = Depends(get_current_user)
) -> Response:
    await crud.delete_dislike(author_id, comment_id)
    await crud.create_like_or_delete_if_exist(author_id, comment_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch("/{comment_id}/dislike", status_code=status.HTTP_204_NO_CONTENT)
async def dislike_comment(
    comment_id: int, author_id: int = Depends(get_current_user)
) -> Response:
    await crud.delete_like(author_id, comment_id)
    await crud.create_dislike_or_delete_if_exist(author_id, comment_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
