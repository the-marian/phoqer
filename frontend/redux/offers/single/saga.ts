import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notificationsModal from '../../../components/common/modal/notifications-modal';
import notifications from '../../../components/common/notifications';
import types from '../../types';
import IAction from './interfaces';

function* getOffer({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.offers.single, payload as string);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_SINGLE_OFFER_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_SINGLE_OFFER_ERROR });
        notificationsModal('error');
    }
}

function* doReview({ payload }: IAction) {
    try {
        const { status } = yield call(api.offers.status, payload as string, { status: 'REVIEW' });
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.OFFER_DO_REVIEW_SUCCESS });
        notifications.info({ message: 'Publish success' });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.OFFER_DO_REVIEW_ERROR });
        notificationsModal('error');
    }
}

export default function* single(): Generator {
    yield all([takeLatest(types.GET_SINGLE_OFFER_START, getOffer), takeLatest(types.OFFER_DO_REVIEW_START, doReview)]);
}
