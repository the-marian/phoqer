import { combineReducers } from 'redux';

import favorite from './favorite/reducer';
import my_offers from './my_offers/reducer';
import new_offer from './new_offer/reducer';
import popular from './popular/reducer';
import search from './search/reducer';
import single from './single/reducer';

export default combineReducers({ popular, new_offer, single, search, favorite, my_offers });
