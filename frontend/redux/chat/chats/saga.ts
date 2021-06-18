import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notifications from '../../../components/common/notifications';
import types from '../../types';
import IAction, { INewChat } from './interfaces';

function* getChats() {
    try {
        const { status, data } = yield call(api.chat.chats);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_CHATS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.GET_CHATS_ERROR });
    }
}

function* createChat({ payload, callback }: IAction) {
    try {
        const { status, data }: AxiosResponse<INewChat> = yield call(api.chat.createChat, payload as INewChat);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.CREATE_CHAT_SUCCESS });
        yield put({ type: types.GET_CHATS_START });
        if (callback) callback(data.id);
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.CREATE_CHAT_ERROR });
    }
}

export default function* chats(): Generator {
    yield all([yield takeLatest(types.GET_CHATS_START, getChats), yield takeLatest(types.CREATE_CHAT_START, createChat)]);
}
