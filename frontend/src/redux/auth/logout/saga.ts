import { put, takeLatest } from 'redux-saga/effects';

import types from '../../types';

function* logoutUser() {
    yield put({ type: types.LOGOUT_END });
    window.location.reload();
}

export default function* logout(): Generator {
    yield takeLatest(types.LOGOUT_INIT, logoutUser);
}
