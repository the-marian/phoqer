import { all, AllEffect, fork, ForkEffect } from 'redux-saga/effects';

import { IOfferCard, IOffers } from '../../interfaces';
import { watcherPopularOffers } from './popular/saga';

export function* watcherOffers(): Generator<
  ForkEffect<IOfferCard[]> | AllEffect<IOffers>,
  void,
  IOffers
> {
  yield all([yield fork(watcherPopularOffers)]);
}
