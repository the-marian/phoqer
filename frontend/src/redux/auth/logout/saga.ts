import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import types from '../types';

function* logoutUser() {
    yield put({ type: types.LOGOUT_END });
    delete axios.defaults.headers.common.Authorization;
}

export default function* logout(): Generator {
    yield takeLatest(types.LOGOUT_INIT, logoutUser);
}
