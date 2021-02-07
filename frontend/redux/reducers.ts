import { combineReducers } from 'redux';

import auth from './auth/reducer';
import categories from './categories/reducer';
import comments from './comments/reducer';
import filters from './filters/reducer';
import offers from './offers/reducer';
import public_profile from './public_profile/reducer';

const rootReducer = combineReducers({
    auth,
    filters,
    offers,
    comments,
    categories,
    public_profile,
});

export default rootReducer;
