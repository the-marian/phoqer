import { all, fork } from 'redux-saga/effects';

import auth from './auth/saga';
import categories from './categories/saga';
import comments from './comments/saga';
import offers from './offers/saga';
import profiles from './profiles/saga';

export default function* rootSaga(): Generator {
    yield all([fork(auth), fork(categories), fork(offers), fork(comments), fork(profiles)]);
}
