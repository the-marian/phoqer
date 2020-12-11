import { all, fork } from 'redux-saga/effects';

import popular from './popular/saga';

export default function* offers(): Generator {
    yield all([yield fork(popular)]);
}
