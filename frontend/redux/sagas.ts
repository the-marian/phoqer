import { all, fork } from 'redux-saga/effects';

import auth from './auth/saga';
import categories from './categories/saga';
import offers from './offers/saga';

export default function* rootSaga(): Generator {
    yield all([yield fork(auth), yield fork(categories), yield fork(offers)]);
}
