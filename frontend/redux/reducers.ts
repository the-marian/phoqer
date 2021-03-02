import { combineReducers } from 'redux';

import auth from './auth/reducer';
import categories from './categories/reducer';
import comments from './comments/reducer';
import filters from './filters/reducer';
import offers from './offers/reducer';
import profiles from './profiles/reducer';

const rootReducer = combineReducers({
    auth,
    filters,
    offers,
    comments,
    categories,
    profiles,
});

export default rootReducer;
