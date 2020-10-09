import { call, ForkEffect, put, takeLatest } from 'redux-saga/effects';

import api from '../../../config/api';
import { IOffers } from '../../../interfaces';
import types from '../../types';

function* getPopularOffers() {
  try {
    const { status, data }: { status: number; data: IOffers } = yield call(
      api.offers.popular.get,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_POPULAR_OFFERS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_POPULAR_OFFERS_ERROR });
  }
}

export function* watcherPopularOffers(): Generator<ForkEffect<never>> {
  yield takeLatest(types.GET_POPULAR_OFFERS_START, getPopularOffers);
}
