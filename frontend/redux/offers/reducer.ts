import { Reducer } from 'react';
import { AnyAction, combineReducers } from 'redux';

import { IOffer } from '../../interfaces';
import popular from './popular/reducer';

export default combineReducers<Reducer<IOffer, AnyAction>>({ popular });
