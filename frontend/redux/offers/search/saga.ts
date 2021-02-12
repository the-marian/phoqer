import { Params } from 'next/dist/next-server/server/router';
import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import { IOfferCard, IState } from '../../../interfaces';
import types from '../../types';

export interface IAction {
    type: typeof types.SEARCH_OFFERS_START | typeof types.SEARCH_OFFERS_ERROR | typeof types.SEARCH_OFFERS_SUCCESS;
    payload: IOfferCard[] | IState | Params | null;
}

function* searchOffers({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.offers.search, payload as Params);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.SEARCH_OFFERS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.SEARCH_OFFERS_ERROR });
    }
}

export default function* search(): Generator {
    yield takeLatest(types.SEARCH_OFFERS_START, searchOffers);
}
