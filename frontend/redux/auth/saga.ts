import { all, fork } from 'redux-saga/effects';

import login from './login/saga';
import logout from './logout/saga';
import user from './user/saga';

export default function* auth(): Generator {
    yield all([yield fork(login), yield fork(logout), yield fork(user)]);
}
