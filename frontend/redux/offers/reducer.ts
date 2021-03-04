import { combineReducers } from 'redux';

import favorite from './favorite/reducer';
import newOffer from './new_offer/reducer';
import popular from './popular/reducer';
import search from './search/reducer';
import single from './single/reducer';

export default combineReducers({ popular, newOffer, single, search, favorite });
