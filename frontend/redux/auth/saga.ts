import { all, fork } from 'redux-saga/effects';

import { watcherLogin } from './login/saga';
import { watcherLogout } from './logout/saga';
import { watcherUser } from './user/saga';

export function* watcherAuth(): Generator {
  yield all([
    yield fork(watcherLogin),
    yield fork(watcherLogout),
    yield fork(watcherUser),
  ]);
}
