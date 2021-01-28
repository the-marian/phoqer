import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import { modal } from '../../../components/Common/Modal';
import { IAuth, IState, Login } from '../../../interfaces';
import types from '../../types';

type Type =
    | typeof types.LOGIN_START
    | typeof types.LOGIN_ERROR
    | typeof types.LOGIN_SUCCESS
    | typeof types.GET_USER_START
    | typeof types.GET_USER_ERROR
    | typeof types.GET_USER_SUCCESS
    | typeof types.LOGOUT_START
    | typeof types.LOGOUT_ERROR
    | typeof types.LOGOUT_SUCCESS;

export interface IAction {
    type: Type;
    payload?: IAuth | IState | Login | null;
}

function* loginUser({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.v1.auth.login, payload as Login);
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
