import { combineReducers } from 'redux';

import newOffer from './new_offer/reducer';
import popular from './popular/reducer';
import single from './single/reducer';

export default combineReducers({ popular, newOffer, single });
