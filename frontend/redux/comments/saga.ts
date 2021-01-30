import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../assets/api';
import { modal } from '../../components/Common/Modal';
import types from '../types';

interface IBody {
    body: string;
    replies_id?: number;
    offer_id?: string;
    images: string[];
}

interface IAction {
    type:
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
    payload: string | number | IBody;
    offerId?: string;
    comment?: number;
}

function* getComments({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.v2.comments.list, payload as string);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.GET_COMMENTS_ERROR });
    }
}

function* createComment({ payload }: IAction) {
    try {
        const { status } = yield call(api.v2.comments.create, payload as IBody);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.CREATE_COMMENT_SUCCESS });
        yield put({ type: types.GET_COMMENTS_START, payload: (payload as IBody).offer_id });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.CREATE_COMMENT_ERROR });
    }
}

function* deleteComment({ payload, offerId }: IAction) {
    try {
        const { status } = yield call(api.v2.comments.delete, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.DELETE_COMMENT_SUCCESS });
        yield put({ type: types.GET_COMMENTS_START, payload: offerId });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.DELETE_COMMENT_ERROR });
    }
}

function* likeComment({ payload, offerId }: IAction) {
    try {
        const { status } = yield call(api.v2.comments.like, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.LIKE_COMMENT_SUCCESS });
        yield put({ type: types.GET_COMMENTS_START, payload: offerId });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.LIKE_COMMENT_ERROR });
    }
}

function* dislikeComment({ payload, offerId }: IAction) {
    try {
        const { status } = yield call(api.v2.comments.dislike, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.DISLIKE_COMMENT_SUCCESS });
        yield put({ type: types.GET_COMMENTS_START, payload: offerId });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.DISLIKE_COMMENT_ERROR });
    }
}

function* replyComment({ payload }: IAction) {
    try {
        const { status } = yield call(api.v2.comments.create, payload as IBody);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.REPLY_COMMENT_SUCCESS });
        modal.close();
        yield put({ type: types.GET_COMMENTS_START, payload: (payload as IBody).offer_id });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.REPLY_COMMENT_ERROR });
    }
}

export default function* comments(): Generator {
    yield all([
        yield takeLatest(types.GET_COMMENTS_START, getComments),
        yield takeLatest(types.CREATE_COMMENT_START, createComment),
        yield takeLatest(types.DELETE_COMMENT_START, deleteComment),
        yield takeLatest(types.LIKE_COMMENT_START, likeComment),
        yield takeLatest(types.DISLIKE_COMMENT_START, dislikeComment),
        yield takeLatest(types.REPLY_COMMENT_START, replyComment),
    ]);
}
