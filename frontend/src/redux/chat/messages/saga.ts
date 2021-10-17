import { all, call, put, takeLatest } from 'redux-saga/effects';

import notifications from '../../../components/common/notifications';
import services from '../services';
import types from '../types';

import IAction from './interfaces';

function* getMessages({ payload }: IAction) {
    try {
        const { status, data } = yield call(services.messages, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_MESSAGES_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.GET_MESSAGES_ERROR });
    }
}

function* loadMoreMessages({ payload, page }: IAction) {
    try {
        const { status, data } = yield call(services.messages, payload as number, page);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.LOAD_MORE_MESSAGES_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.LOAD_MORE_MESSAGES_ERROR });
    }
}

export default function* messages(): Generator {
    yield all([
        yield takeLatest(types.GET_MESSAGES_START, getMessages),
        yield takeLatest(types.LOAD_MORE_MESSAGES_START, loadMoreMessages),
    ]);
}
