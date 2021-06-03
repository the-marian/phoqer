import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notifications from '../../../components/common/notifications';
import types from '../../types';

function* getChats() {
    try {
        const { status, data } = yield call(api.chat.chats);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_CHATS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data || '...' });
        yield put({ type: types.GET_CHATS_ERROR });
    }
}

export default function* chats(): Generator {
    yield takeLatest(types.GET_CHATS_START, getChats);
}
