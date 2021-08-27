import { call, put, takeLatest } from 'redux-saga/effects';

import notifications from '../../../components/common/notifications';
import api from '../../../utils/api';
import types from '../../types';

import IAction from './interfaces';

function* getChatOfferInfo({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.chat.offerInfo, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_CHAT_OFFER_INFO_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notifications.error({ message: error?.response?.data?.detail || '...' });
        yield put({ type: types.GET_CHAT_OFFER_INFO_ERROR });
    }
}

export default function* info(): Generator {
    yield takeLatest(types.GET_CHAT_OFFER_INFO_START, getChatOfferInfo);
}
