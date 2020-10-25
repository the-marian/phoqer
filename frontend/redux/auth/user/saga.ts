import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../../config/api';
import types from '../../types';

function* user() {
  try {
    const { status, data }: { status: number; data: unknown } = yield call(
      api.auth.user,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_USER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_USER_ERROR });
  }
}

export function* watcherUser(): Generator {
  yield takeLatest(types.GET_USER_START, user);
}
