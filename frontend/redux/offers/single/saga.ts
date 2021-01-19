import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notifications from '../../../components/Common/Notifications';
import types from '../../types';

interface IAction {
    type: typeof types.GET_SINGLE_OFFER_START | typeof types.GET_SINGLE_OFFER_SUCCESS | typeof types.GET_SINGLE_OFFER_ERROR;
    payload: string;
}

function* getOffer({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.offers.single.get, payload);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_SINGLE_OFFER_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.GET_SINGLE_OFFER_ERROR });
        notifications('error');
    }
}

export default function* single(): Generator {
    yield takeLatest(types.GET_SINGLE_OFFER_START, getOffer);
}
