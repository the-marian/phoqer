import { AnyAction } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { encryptor } from '../../config/encryptor';
import { IAuth } from '../../interfaces';
import types from '../types';

const auth = (state: IAuth = { auth_token: null, user: null }, { type, payload }: AnyAction): IAuth => {
    switch (type) {
        case types.LOGIN_SUCCESS:
            return { ...payload };

        case types.GET_USER_SUCCESS:
            return { ...state, ...payload };

        case types.LOGOUT_SUCCESS:
            return { ...state, auth_token: null };

        case types.GET_USER_START:
        case types.GET_USER_ERROR:
        case types.LOGOUT_START:
        case types.LOGOUT_ERROR:
        case types.LOGIN_START:
        case types.LOGIN_ERROR:
            return state;

        default:
            return state;
    }
};

const config = {
    storage,
    key: 'auth',
    white: ['auth_token'],
    transforms: [encryptor],
};

export default persistReducer(config, auth);
