import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../assets/api';
import types from '../types';

interface IBody {
    body: string;
    offer_id: string;
}

interface IAction {
    type:
        | typeof types.GET_COMMENTS_START
        | typeof types.GET_COMMENTS_ERROR
        | typeof types.GET_COMMENTS_SUCCESS
        | typeof types.CREATE_COMMENT_START
        | typeof types.CREATE_COMMENT_ERROR
        | typeof types.CREATE_COMMENT_SUCCESS;
    payload: string | IBody;
}

function* getComments({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.comments.list, payload as string);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.GET_COMMENTS_ERROR });
    }
}

function* create({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.comments.create, (payload as IBody).offer_id, payload as IBody);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.GET_COMMENTS_ERROR });
    }
}

export default function* comments(): Generator {
    yield all([yield takeLatest(types.GET_COMMENTS_START, getComments), yield takeLatest(types.CREATE_COMMENT_START, create)]);
}
