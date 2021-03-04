import { all, fork } from 'redux-saga/effects';

import favorite from './favorite/saga';
import newOffer from './new_offer/saga';
import popular from './popular/saga';
import search from './search/saga';
import single from './single/saga';

export default function* offers(): Generator {
    yield all([fork(popular), fork(newOffer), fork(single), fork(search), fork(favorite)]);
}
