import { combineReducers } from 'redux';

import chatDrawer from './chatDrawer/reducer';
import drawer from './drawer/reducer';
import searchParams from './searchParams/reducer';

const config = combineReducers({
    drawer,
    chatDrawer,
    searchParams,
});

export default config;
