import { combineReducers } from 'redux';

import auth from './auth/reducer';
import categories from './categories/reducer';
import filters from './filters/reducer';
import offers from './offers/reducer';

const rootReducer = combineReducers({
    auth,
    filters,
    offers,
    categories,
});

export default rootReducer;
