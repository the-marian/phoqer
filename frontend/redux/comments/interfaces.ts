import { IComment, IState } from '../../interfaces';
import types from '../types';

type Type =
    | typeof types.GET_COMMENTS_START
    | typeof types.GET_COMMENTS_ERROR
    | typeof types.GET_COMMENTS_SUCCESS
    | typeof types.CREATE_COMMENT_START
    | typeof types.CREATE_COMMENT_ERROR
    | typeof types.CREATE_COMMENT_SUCCESS
    | typeof types.LIKE_COMMENT_START
    | typeof types.LIKE_COMMENT_ERROR
    | typeof types.LIKE_COMMENT_SUCCESS
    | typeof types.DISLIKE_COMMENT_START
    | typeof types.DISLIKE_COMMENT_ERROR
    | typeof types.DISLIKE_COMMENT_SUCCESS
    | typeof types.REPLY_COMMENT_START
    | typeof types.REPLY_COMMENT_ERROR
    | typeof types.REPLY_COMMENT_SUCCESS
    | typeof types.DELETE_COMMENT_START
    | typeof types.DELETE_COMMENT_ERROR
    | typeof types.DELETE_COMMENT_SUCCESS;

export interface IBody {
    body: string;
    replies_id?: number;
    offer_id?: string;
    images: string[];
}

export interface IAction {
    type: Type;
    payload: IComment[] | IState | string | number | IBody;
    offerId?: string;
    comment?: number;
}
