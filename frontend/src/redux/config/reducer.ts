import { combineReducers } from 'redux';

import chatDrawer from './chatDrawer/reducer';
import searchParams from './searchParams/reducer';

const config = combineReducers({
    chatDrawer,
    searchParams,
});

export default config;
