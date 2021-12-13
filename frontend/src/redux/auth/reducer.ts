import { HYDRATE } from 'next-redux-wrapper';

import { IAuth, IState } from '../../interfaces';

import authInit from './init-state';
import IAction from './login/interfaces';
import types from './types';

const auth = (state: IAuth = authInit, { type, payload }: IAction): IAuth => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).auth;

        case types.LOGIN_SUCCESS:
            return { loading: false };

        case types.LOGIN_START:
        case types.SIGNUP_START:
        case types.GET_USER_START:
            return { loading: true };

        case types.LOGIN_ERROR:
        case types.SIGNUP_SUCCESS:
        case types.SIGNUP_ERROR:
        case types.GET_USER_SUCCESS:
        case types.GET_USER_ERROR:
            return { loading: false };

        default:
            return state;
    }
};

export default auth;
