import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import { modal } from '../../../components/common/modal';
import notificationsModal from '../../../components/common/modal/notifications-modal';
import { ILogin } from '../../../interfaces';
import types from '../../types';
import IAction from './interfaces';

function* loginUser({ payload }: IAction) {
    const value = new FormData();
    value.append('username', (payload as ILogin).username);
    value.append('password', (payload as ILogin).password);

    try {
        const { status, data } = yield call(api.auth.login, value);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.LOGIN_SUCCESS, payload: data });
        modal.close();
    } catch (error) {
        if (error?.response?.status === 401) return;
        // TODO add error text
        notificationsModal('error');
        yield put({ type: types.LOGIN_ERROR });
    }
}

export default function* login(): Generator {
    yield takeLatest(types.LOGIN_START, loginUser);
}
