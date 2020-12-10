import { all, fork } from 'redux-saga/effects';

import login from './login/saga';
import logout from './logout/saga';
import user from './user/saga';

export function* watcherAuth(): Generator {
    yield all([fork(login), fork(logout), fork(user)]);
}
