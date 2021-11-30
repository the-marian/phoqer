import { all, call, put, takeLatest } from 'redux-saga/effects';

import notifications from '../../../components/common/notifications';
import services from '../services';
import types from '../types';

import IAction from './interfaces';

function* getChatItem({ payload }: IAction) {
    try {
        const { status, data } = yield call(services.singleChat, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_CHAT_ITEM_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.GET_CHAT_ITEM_ERROR });
    }
}

function* updateStatus({ payload, status: chatStatus, callback }: IAction) {
    try {
        const { status } = yield call(services.updateChat, payload as number, chatStatus);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.UPDATE_CHAT_SUCCESS, payload: { chat_id: payload, status: chatStatus } });
        callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.UPDATE_CHAT_ERROR });
    }
}

function* deleteChat({ payload, callback }: IAction) {
    try {
        const { status } = yield call(services.deleteChat, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.DELETE_CHAT_SUCCESS, payload: payload });
        callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.DELETE_CHAT_ERROR });
    }
}

export default function* info(): Generator {
    yield all([
        yield takeLatest(types.GET_CHAT_ITEM_START, getChatItem),
        yield takeLatest(types.UPDATE_CHAT_START, updateStatus),
        yield takeLatest(types.DELETE_CHAT_START, deleteChat),
    ]);
}
