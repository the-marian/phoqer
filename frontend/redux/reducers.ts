import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { encryptor } from '../assets/encryptor';
import auth from './auth/reducer';
import categories from './categories/reducer';
import offers from './offers/reducer';

const rootReducer = combineReducers({
    auth,
    offers,
    categories,
});

const config = {
    storage,
    key: 'blog_auth',
    white: ['token'],
    transforms: [encryptor],
};

export default persistReducer(config, rootReducer);
