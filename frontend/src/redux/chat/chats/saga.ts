import { AxiosResponse } from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import notifications from '../../../components/common/notifications';
import { ChatTypeEnum, IState } from '../../../interfaces';
import services from '../services';
import types from '../types';

import IAction, { INewChat } from './interfaces';

function* getChats() {
    try {
        const type: ChatTypeEnum = yield select<(state: IState) => ChatTypeEnum>(state => state.chat.chats.type);
        const { status, data } = yield call(services.chats, 1, type);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_CHATS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.GET_CHATS_ERROR });
    }
}

function* refreshChats() {
    try {
        const type: ChatTypeEnum = yield select<(state: IState) => ChatTypeEnum>(state => state.chat.chats.type);
        const { status, data } = yield call(services.chats, 1, type);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.REFRESH_CHATS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.REFRESH_CHATS_ERROR });
    }
}

function* createChat({ payload, callback }: IAction) {
    try {
        const { status, data }: AxiosResponse<INewChat> = yield call(services.createChat, payload as INewChat);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.CREATE_CHAT_SUCCESS });
        if (callback) callback(data.id);
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.CREATE_CHAT_ERROR });
    }
}

export default function* chats(): Generator {
    yield all([
        yield takeLatest(types.GET_CHATS_START, getChats),
        yield takeLatest(types.REFRESH_CHATS_START, refreshChats),
        yield takeLatest(types.CREATE_CHAT_START, createChat),
    ]);
}
