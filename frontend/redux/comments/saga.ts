import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../assets/api';
import { modal } from '../../components/common/modal';
import notificationsModal from '../../components/common/modal/notifications-modal';
import types from '../types';
import { IAction, IBody } from './interfaces';

function* getComments({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.comments.list, payload as string);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_COMMENTS_ERROR });
    }
}

function* createComment({ payload }: IAction) {
    try {
        const { status } = yield call(api.comments.create, payload as IBody);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.CREATE_COMMENT_SUCCESS });
        yield put({ type: types.GET_COMMENTS_START, payload: (payload as IBody).offer_id });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.CREATE_COMMENT_ERROR });
    }
}

function* deleteComment({ payload, offerId }: IAction) {
    try {
        const { status } = yield call(api.comments.delete, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.DELETE_COMMENT_SUCCESS });
        yield put({ type: types.GET_COMMENTS_START, payload: offerId });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.DELETE_COMMENT_ERROR });
    }
}

function* likeComment({ payload, offerId }: IAction) {
    try {
        const { status } = yield call(api.comments.like, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.LIKE_COMMENT_SUCCESS });
        yield put({ type: types.GET_COMMENTS_START, payload: offerId });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.LIKE_COMMENT_ERROR });
    }
}

function* dislikeComment({ payload, offerId }: IAction) {
    try {
        const { status } = yield call(api.comments.dislike, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.DISLIKE_COMMENT_SUCCESS });
        yield put({ type: types.GET_COMMENTS_START, payload: offerId });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.DISLIKE_COMMENT_ERROR });
    }
}

function* replyComment({ payload }: IAction) {
    try {
        const { status } = yield call(api.comments.create, payload as IBody);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.REPLY_COMMENT_SUCCESS });
        modal.close();
        yield put({ type: types.GET_COMMENTS_START, payload: (payload as IBody).offer_id });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
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
