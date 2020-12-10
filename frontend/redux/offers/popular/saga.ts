import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import types from '../../types';

function* getPopular() {
    try {
        const { status, data } = yield call(api.offers.popular.get);
        if (status < 200 || status >= 300) throw new Error('Something went wrong');
        yield put({ type: types.GET_POPULAR_OFFERS_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: types.GET_POPULAR_OFFERS_ERROR });
    }
}

export default function* popular(): Generator {
    yield takeLatest(types.GET_POPULAR_OFFERS_START, getPopular);
}
