import { Params } from 'next/dist/next-server/server/router';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notificationsModal from '../../../components/common/modal/notifications-modal';
import types from '../../types';
import IAction from './interfaces';

function* searchOffers({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.offers.search, payload as Params);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.SEARCH_OFFERS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.SEARCH_OFFERS_ERROR });
    }
}

function* searchOffersPagination({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.offers.search, payload as Params);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.SEARCH_OFFERS_PAGINATION_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.SEARCH_OFFERS_PAGINATION_ERROR });
    }
}

export default function* search(): Generator {
    yield all([
        takeLatest(types.SEARCH_OFFERS_START, searchOffers),
        takeLatest(types.SEARCH_OFFERS_PAGINATION_START, searchOffersPagination),
    ]);
}
