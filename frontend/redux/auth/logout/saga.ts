import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../config/api';
import types from '../../types';

function* logout() {
    try {
        const { status }: { status: number } = yield call(api.auth.logout);
        if (status < 200 || status >= 300) throw new Error('Something went wrong');
        yield put({ type: types.LOGOUT_SUCCESS });
        delete axios.defaults.headers.common.Authorization;
    } catch (error) {
        yield put({ type: types.LOGOUT_ERROR });
    }
}

export function* watcherLogout(): Generator {
    yield takeLatest(types.LOGOUT_START, logout);
}
