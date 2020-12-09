import { Reducer } from 'react';
import { AnyAction, combineReducers } from 'redux';

import { IState } from '../interfaces';
import auth from './auth/reducer';
import categories from './categories/reducer';
import modal from './modal/reducer';
import offers from './offers/reducer';

export default combineReducers<Reducer<IState, AnyAction>>({
    auth,
    modal,
    offers,
    categories,
});
