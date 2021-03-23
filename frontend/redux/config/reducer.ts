import { combineReducers } from 'redux';

import drawer from './drawer/reducer';
import offers from './offers/reducer';
import search from './search/reducer';

const config = combineReducers({
    drawer,
    offers,
    search,
});

export default config;
