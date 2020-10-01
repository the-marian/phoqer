import { call, put, takeLatest } from 'redux-saga/effects';
import types from '../types';
import api from '../../config/api';
import { ICategories } from '../../interfaces';

function* getCategories() {
  try {
    const { status, data }: { status: number; data: ICategories } = yield call(
      api.categories.get,
    );
    if (status < 200 || status >= 300) throw new Error('Something went wrong');
    yield put({ type: types.GET_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_CATEGORIES_ERROR });
  }
}

export function* watcherCategories() {
  yield takeLatest(types.GET_CATEGORIES_START, getCategories);
}
