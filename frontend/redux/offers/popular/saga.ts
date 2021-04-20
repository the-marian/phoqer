import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notificationsModal from '../../../components/common/modal/notifications-modal';
import types from '../../types';

function* getPopular() {
    try {
        const { status, data } = yield call(api.offers.popular);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_POPULAR_OFFERS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_POPULAR_OFFERS_ERROR });
    }
}

export default function* popular(): Generator {
    yield takeLatest(types.GET_POPULAR_OFFERS_START, getPopular);
}
