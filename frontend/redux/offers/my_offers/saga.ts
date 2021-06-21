import { Params } from 'next/dist/next-server/server/router';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import notificationsModal from '../../../components/common/modal/notifications-modal';
import api from '../../../utils/api';
import types from '../../types';
import IAction, { IParams } from './interfaces';

function* getMyOffers({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.offers.myOffers, payload as IParams);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.MY_OFFERS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.MY_OFFERS_ERROR });
    }
}

function* getMyOffersPagination({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.offers.myOffers, payload as IParams);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.MY_OFFERS_PAGINATION_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.MY_OFFERS_PAGINATION_ERROR });
    }
}

function* getPublicOffers({ payload, params }: IAction) {
    try {
        const { status, data } = yield call(api.offers.publicOffers, payload as string, params as Params);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.PUBLIC_OFFERS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.PUBLIC_OFFERS_ERROR });
    }
}

function* getPublicOffersPagination({ payload, params }: IAction) {
    try {
        const { status, data } = yield call(api.offers.publicOffers, payload as string, params as Params);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.PUBLIC_OFFERS_PAGINATION_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.PUBLIC_OFFERS_PAGINATION_ERROR });
    }
}

export default function* myOffers(): Generator {
    yield all([
        yield takeLatest(types.MY_OFFERS_START, getMyOffers),
        yield takeLatest(types.MY_OFFERS_PAGINATION_START, getMyOffersPagination),
        yield takeLatest(types.PUBLIC_OFFERS_START, getPublicOffers),
        yield takeLatest(types.PUBLIC_OFFERS_PAGINATION_START, getPublicOffersPagination),
    ]);
}
