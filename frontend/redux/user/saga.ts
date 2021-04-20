import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../assets/api';
import notificationsModal from '../../components/common/modal/notifications-modal';
import types from '../types';

function* getUser() {
    try {
        const { status, data } = yield call(api.auth.user);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_USER_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_USER_ERROR });
    }
}

export default function* user(): Generator {
    yield takeLatest(types.GET_USER_START, getUser);
}
