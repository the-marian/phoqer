import { all, fork } from 'redux-saga/effects';

import { watcherAuth } from './auth/saga';
import categories from './categories/saga';
import offers from './offers/saga';

export default function* rootSaga(): Generator {
    yield all([fork(watcherAuth), fork(categories), fork(offers)]);
}
