import { all, fork } from 'redux-saga/effects';

import publicProfile from './public/saga';

export default function* profiles(): Generator {
    yield all([fork(publicProfile)]);
}
