import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../assets/api';
import notificationsModal from '../../../components/common/modal/notifications-modal';
import types from '../../types';
import IAction from './interfaces';

function* getFavorite() {
    try {
        const { status, data } = yield call(api.offers.favorite.get);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_FAVORITE_OFFERS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_FAVORITE_OFFERS_ERROR });
    }
}

function* patchFavorite({ payload }: IAction) {
    try {
        const { status } = yield call(api.offers.favorite.patch, payload as string);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.PATCH_FAVORITE_OFFERS_SUCCESS, payload });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.PATCH_FAVORITE_OFFERS_ERROR });
    }
}

export default function* favorite(): Generator {
    yield all([
        yield takeLatest(types.GET_FAVORITE_OFFERS_START, getFavorite),
        yield takeLatest(types.PATCH_FAVORITE_OFFERS_START, patchFavorite),
    ]);
}
