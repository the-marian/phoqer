import { all, fork } from 'redux-saga/effects';

import { watcherAuth } from './auth/saga';
import { watcherCategories } from './categories/saga';
import { watcherOffers } from './offers/saga';

export default function* rootSaga(): Generator {
    yield all([yield fork(watcherAuth), yield fork(watcherCategories), yield fork(watcherOffers)]);
}
