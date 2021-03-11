import { combineReducers, Reducer } from 'redux';

import drawer from './reducer';
import filters from './reducer';

const config: Reducer = combineReducers({
    drawer,
    filters,
});

export default config;
