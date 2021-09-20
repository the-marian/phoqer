import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import { modal } from '../../../components/common/modal';
import types from '../../types';

function* logoutUser() {
    delete axios.defaults.headers.common.Authorization;
    modal.close();
    yield put({ type: types.LOGOUT_END });
}

export default function* logout(): Generator {
    yield takeLatest(types.LOGOUT_INIT, logoutUser);
}
