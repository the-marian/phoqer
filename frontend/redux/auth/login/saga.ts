import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import { modal } from '../../../components/Common/Modal';
import { Login } from '../../../interfaces';
import types from '../../types';
import IAction from './interfaces';

function* loginUser({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.auth.login, payload as Login);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.LOGIN_SUCCESS, payload: data });
        modal.close();
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.LOGIN_ERROR });
    }
}

export default function* login(): Generator {
    yield takeLatest(types.LOGIN_START, loginUser);
}
