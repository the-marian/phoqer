import { HYDRATE } from 'next-redux-wrapper';

import { IAuth, IState } from '../../interfaces';
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
    payload?: IAuth | IState | null;
}

const INIT: IAuth = { auth_token: null, user: null };

const auth = (state: IAuth = INIT, { type, payload }: IAction): IAuth => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).auth;

        case types.LOGIN_SUCCESS:
            return payload as IAuth;

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

export default auth;
