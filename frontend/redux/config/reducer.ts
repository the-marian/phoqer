import { combineReducers } from 'redux';

import drawer from './drawer/reducer';
import searchHiddenBlocks from './searchHiddenBlocks/reducer';
import searchParams from './searchParams/reducer';

const config = combineReducers({
    drawer,
    searchHiddenBlocks,
    searchParams,
});

export default config;
