import { HYDRATE } from 'next-redux-wrapper';

import { IAuth, IState } from '../../interfaces';
import types from '../types';
import IAction from './login/interfaces';

const INIT: IAuth = { access_token: null, loading: false };

const auth = (state: IAuth = INIT, { type, payload }: IAction): IAuth => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).auth;

        case types.LOGIN_SUCCESS:
            return { access_token: (payload as IAuth).access_token, loading: false };

        case types.LOGOUT_END:
            return INIT;

        case types.LOGIN_START:
        case types.SIGNUP_START:
        case types.GET_USER_START:
            return { ...state, loading: true };

        case types.LOGIN_ERROR:
        case types.SIGNUP_SUCCESS:
        case types.SIGNUP_ERROR:
        case types.GET_USER_SUCCESS:
        case types.GET_USER_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default auth;
