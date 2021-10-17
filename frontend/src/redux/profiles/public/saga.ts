import { call, put, takeLatest } from 'redux-saga/effects';


import types from '../types';
import IAction from './interfaces';
import notificationsModal from "../../../components/common/modal/notifications-modal";
import services from "../services";

function* getProfile({ payload }: IAction) {
    try {
        const { status, data } = yield call(services.get, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_PUBLIC_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_PUBLIC_PROFILE_ERROR });
    }
}

export default function* profile(): Generator {
    yield takeLatest(types.GET_PUBLIC_PROFILE_START, getProfile);
}
