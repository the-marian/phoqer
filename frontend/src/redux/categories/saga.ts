import { call, put, takeLatest } from 'redux-saga/effects';

import notificationsModal from '../../components/common/modal/notifications-modal';

import services from './services';
import types from './types';

function* getCategories() {
    try {
        const { status, data } = yield call(services.get);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_CATEGORIES_ERROR });
    }
}

export default function* categories(): Generator {
    yield takeLatest(types.GET_CATEGORIES_START, getCategories);
}
