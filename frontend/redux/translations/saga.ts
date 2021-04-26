import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../assets/api';
import notificationsModal from '../../components/common/modal/notifications-modal';
import { Languages } from '../../interfaces';
import types from '../types';
import IAction from './interfaces';

function* getTranslations({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.translations.get, payload as Languages);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_TRANSLATIONS_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        notificationsModal('error');
        yield put({ type: types.GET_TRANSLATIONS_ERROR });
    }
}

export default function* translations(): Generator {
    yield takeLatest(types.GET_TRANSLATIONS_START, getTranslations);
}
