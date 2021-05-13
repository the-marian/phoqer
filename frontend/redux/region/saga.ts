import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '../../assets/api';
import notificationsModal from '../../components/common/modal/notifications-modal';
import types from '../types';
import IAction from './interfaces';

function* getCountries() {
    try {
        const { status, data } = yield call(api.locations.countries);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_COUNTRIES_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_COUNTRIES_ERROR });
    }
}

function* getCities({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.locations.cities, payload as string);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_CITIES_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_CITIES_ERROR });
    }
}

export default function* region(): Generator {
    yield all([takeLatest(types.GET_COUNTRIES_START, getCountries), takeLatest(types.GET_CITIES_START, getCities)]);
}
