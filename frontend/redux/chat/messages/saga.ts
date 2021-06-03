import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notifications from '../../../components/common/notifications';
import types from '../../types';
import IAction from './interfaces';

function* getMessages({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.chat.messages, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_MESSAGES_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data || '...' });
        yield put({ type: types.GET_MESSAGES_ERROR });
    }
}

export default function* messages(): Generator {
    yield takeLatest(types.GET_MESSAGES_START, getMessages);
}
