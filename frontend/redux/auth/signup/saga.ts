import { call, put, takeLatest } from 'redux-saga/effects';

import { modal } from '../../../components/common/modal';
import notificationsModal from '../../../components/common/modal/notifications-modal';
import { ISignup } from '../../../interfaces';
import api from '../../../utils/api';
import types from '../../types';
import IAction from './interfaces';

function* signupUser({ payload }: IAction) {
    try {
        const { status } = yield call(api.auth.signup, payload as ISignup);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.SIGNUP_SUCCESS });
        modal.close();
        notificationsModal('success', 'we_have_sent_verification_link');
    } catch (error) {
        if (error?.response?.status === 401) return;
        // TODO add error-template text
        notificationsModal('error', '');
        yield put({ type: types.SIGNUP_ERROR });
    }
}

export default function* signup(): Generator {
    yield takeLatest(types.SIGNUP_START, signupUser);
}
