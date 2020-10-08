import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import { IOffer, PopularOffer } from '../../interfaces';
import { watcherPopularOffers } from './popular/saga';

export function* watcherOffers(): Generator<
  ForkEffect<PopularOffer[]> | AllEffect<IOffer>,
  void,
  IOffer
> {
  yield all([yield fork(watcherPopularOffers)]);
}
