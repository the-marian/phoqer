import { all, fork } from 'redux-saga/effects';

import login from './login/saga';
import signup from './signup/saga';

export default function* auth(): Generator {
    yield all([fork(login), fork(signup)]);
}
