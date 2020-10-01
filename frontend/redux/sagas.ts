import { all, fork } from 'redux-saga/effects';

import { watcherCategories } from './categories/saga';

export default function* rootSaga() {
  yield all([
    yield fork(watcherCategories),
  ]);
}
