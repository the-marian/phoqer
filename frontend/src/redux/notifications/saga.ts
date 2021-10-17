import { call, put, all, takeLatest } from 'redux-saga/effects';

import notificationsModal from '../../components/common/modal/notifications-modal';

import IAction from './interfaces';
import services from './services';
import types from './types';

function* getNotifications({ payload }: IAction) {
    try {
        const { status, data } = yield call(services.get, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_NOTIFICATIONS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_NOTIFICATIONS_ERROR });
    }
}

function* getNotificationsPagination({ payload }: IAction) {
    try {
        const { status, data } = yield call(services.get, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_NOTIFICATIONS_PAGINATION_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_NOTIFICATIONS_PAGINATION_ERROR });
    }
}

export default function* notifications(): Generator {
    yield all([
        yield takeLatest(types.GET_NOTIFICATIONS_START, getNotifications),
        yield takeLatest(types.GET_NOTIFICATIONS_PAGINATION_START, getNotificationsPagination),
    ]);
}
