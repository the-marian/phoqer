import { combineReducers } from 'redux';

import drawer from './drawer/reducer';
import searchParams from './searchParams/reducer';

const config = combineReducers({
    drawer,
    searchParams,
});

export default config;
