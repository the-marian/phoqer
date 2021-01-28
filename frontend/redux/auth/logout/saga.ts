import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import types from '../../types';

function* logoutUser() {
    try {
        const { status } = yield call(api.v1.auth.logout);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.LOGOUT_SUCCESS });
    } catch (error) {
        yield put({ type: types.LOGOUT_ERROR });
    } finally {
        delete axios.defaults.headers.common.Authorization;
    }
}

export default function* logout(): Generator {
    yield takeLatest(types.LOGOUT_START, logoutUser);
}
