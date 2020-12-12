import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { encryptor } from '../../assets/encryptor';
import { IAuth } from '../../interfaces';
import types from '../types';

type Type =
    | typeof types.LOGIN_START
    | typeof types.LOGIN_ERROR
    | typeof types.LOGIN_SUCCESS
    | typeof types.GET_USER_START
    | typeof types.GET_USER_ERROR
    | typeof types.GET_USER_SUCCESS
    | typeof types.LOGOUT_START
    | typeof types.LOGOUT_ERROR
    | typeof types.LOGOUT_SUCCESS;

interface IAction {
    type: Type;
    payload?: IAuth | null;
}

const INIT: IAuth = { auth_token: null, user: null };

const auth = (state: IAuth = INIT, { type, payload }: IAction): IAuth => {
    switch (type) {
        case types.LOGIN_SUCCESS:
            return { ...payload };

        case types.GET_USER_SUCCESS:
            return { ...state, ...payload };

        case types.LOGOUT_SUCCESS:
            return INIT;

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
    key: 'phoqer_auth',
    white: ['token'],
    transforms: [encryptor],
};

export default persistReducer(config, auth);
