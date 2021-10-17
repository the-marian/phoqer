import { call, put, takeLatest } from 'redux-saga/effects';

import notificationsModal from '../../../components/common/modal/notifications-modal';
import { ILogin } from '../../../interfaces';
import services from '../services';
import types from '../types';

import IAction from './interfaces';

function* loginUser({ payload }: IAction) {
    const value = new FormData();
    value.append('username', (payload as ILogin).username);
    value.append('password', (payload as ILogin).password);

    try {
        const { status, data } = yield call(services.login, value);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.LOGIN_SUCCESS, payload: data });
        window.location.reload();
    } catch (error) {
        if (error?.response?.status === 401) return;
        // TODO add error-template text
        yield put({ type: types.LOGIN_ERROR });
        if (error?.response?.data?.detail === 'Inactive user')
            return notificationsModal('error', 'your_account_has_not_been_verified');
        notificationsModal('error');
    }
}

export default function* login(): Generator {
    yield takeLatest(types.LOGIN_START, loginUser);
}
