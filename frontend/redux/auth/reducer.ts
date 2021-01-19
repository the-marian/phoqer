import { HYDRATE } from 'next-redux-wrapper';

import { IAuth, IState } from '../../interfaces';
import types from '../types';
import { IAction } from './login/saga';

const INIT: IAuth = { auth_token: null };

const auth = (state: IAuth = INIT, { type, payload }: IAction): IAuth => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).auth;

        case types.LOGIN_SUCCESS:
            return payload as IAuth;

        case types.GET_USER_SUCCESS:
            return { ...state, ...(payload as IAuth) };

        case types.LOGOUT_SUCCESS:
        case types.LOGOUT_ERROR:
            return INIT;

        case types.LOGOUT_START:
        case types.LOGIN_START:
        case types.GET_USER_START:
        case types.GET_USER_ERROR:
        case types.LOGIN_ERROR:
            return state;

        default:
            return state;
    }
};

export default auth;
