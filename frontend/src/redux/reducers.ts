import { combineReducers, Reducer } from 'redux';

import { IState } from '../interfaces';

import auth from './auth/reducer';
import categories from './categories/reducer';
import chat from './chat/reducer';
import comments from './comments/reducer';
import config from './config/reducer';
import offers from './offers/reducer';
import profiles from './profiles/reducer';
import region from './region/reducer';
import user from './user/reducer';

const rootReducer = combineReducers<Reducer<IState>>({
    auth,
    user,
    region,
    config,
    offers,
    comments,
    categories,
    profiles,
    chat,
});

export default rootReducer;
