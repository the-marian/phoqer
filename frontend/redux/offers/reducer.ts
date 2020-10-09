import { Reducer } from 'react';
import { AnyAction, combineReducers } from 'redux';

import { IOffers } from '../../interfaces';
import popular from './popular/reducer';

export default combineReducers<Reducer<IOffers, AnyAction>>({ popular });
