import { combineReducers } from 'redux';

import drawer from './drawer/reducer';
import offers from './offers/reducer';

const config = combineReducers({
    drawer,
    offers,
});

export default config;
