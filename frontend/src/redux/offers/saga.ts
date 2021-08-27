import { all, fork } from 'redux-saga/effects';

import edit_offer from './edit_offer/saga';
import favorite from './favorite/saga';
import myOffers from './my_offers/saga';
import new_offer from './new_offer/saga';
import popular from './popular/saga';
import search from './search/saga';
import single from './single/saga';

export default function* offers(): Generator {
    yield all([fork(popular), fork(new_offer), fork(single), fork(search), fork(favorite), fork(myOffers), fork(edit_offer)]);
}
