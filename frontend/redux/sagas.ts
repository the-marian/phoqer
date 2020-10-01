import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import { IStore } from '../interfaces';
import { watcherCategories } from './categories/saga';

export default function* rootSaga(): Generator<
  ForkEffect<IStore> | AllEffect<unknown>
> {
  yield all([yield fork(watcherCategories)]);
}
