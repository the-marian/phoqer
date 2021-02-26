import { IState } from '../../../interfaces/index';
import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../../assets/api';
import types from '../../types';

export interface IAction {
    type: typeof types.GET_PUBLIC_PROFILE_START | typeof types.GET_PUBLIC_PROFILE_ERROR | typeof types.GET_PUBLIC_PROFILE_SUCCESS;
    payload: number | IState | null | string;
}

function* getProfile({ payload }: IAction) {
    try {
        const { status, data } = yield call(api.v1.profiles.public.get, payload as number);
        if (status < 200 || status >= 300) throw new Error();
        yield put({ type: types.GET_PUBLIC_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        if (error?.response?.status === 401) return;
        yield put({ type: types.GET_PUBLIC_PROFILE_ERROR });
    }
}

export default function* profile(): Generator {
    yield takeLatest(types.GET_PUBLIC_PROFILE_START, getProfile);
}
