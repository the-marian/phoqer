import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import { modal } from '../../../components/Common/Modal';
import types from '../../types';

function* loginUser({ payload }: AnyAction) {
    try {
        const { status, data } = yield call(api.auth.login, payload);
        if (status < 200 || status >= 300) throw new Error('Something went wrong');
        yield put({ type: types.LOGIN_SUCCESS, payload: data });
        modal.close();
    } catch (error) {
        yield put({ type: types.LOGIN_ERROR });
    }
}

export default function* login(): Generator {
    yield takeLatest(types.LOGIN_START, loginUser);
}
