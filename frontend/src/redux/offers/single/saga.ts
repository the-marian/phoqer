import { all, call, put, takeLatest } from 'redux-saga/effects';

import notificationsModal from '../../../components/common/modal/notifications-modal';
import services from '../services';
import types from '../types';

import IAction from './interfaces';

function* getOffer({ payload }: IAction) {
    try {
        const { status, data } = yield call(services.single, payload as string);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_SINGLE_OFFER_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_SINGLE_OFFER_ERROR });
        notificationsModal('error');
    }
}

function* doReview({ offerId, tab, page, callback }: IAction) {
    try {
        const { status } = yield call(services.status, offerId as string, { status: 'REVIEW' });
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.OFFER_DO_REVIEW_SUCCESS });
        yield put({
            type: types.MY_OFFERS_START,
            payload: { tab, params: { page } },
        });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.OFFER_DO_REVIEW_ERROR });
        notificationsModal('error');
    }
}

function* deleteOffer({ offerId, callback }: IAction) {
    try {
        const { status } = yield call(services.deleteOffer, offerId as string);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.DELETE_OFFER_SUCCESS, payload: offerId });
        if (callback) callback();
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.DELETE_OFFER_ERROR });
    }
}

export default function* single(): Generator {
    yield all([
        yield takeLatest(types.GET_SINGLE_OFFER_START, getOffer),
        yield takeLatest(types.OFFER_DO_REVIEW_START, doReview),
        yield takeLatest(types.DELETE_OFFER_START, deleteOffer),
    ]);
}
