import { IPublicProfile } from '../../interfaces';
import types from '../types';

import userInit from './init-state';
import IAction from './interfaces';

const user = (state: IPublicProfile = userInit, { type, payload }: IAction): IPublicProfile => {
    switch (type) {
        case types.GET_USER_SUCCESS:
            return payload as IPublicProfile;

        case types.UPDATE_USER_START:
            return { ...state, ...(payload as IPublicProfile) };

        case types.LOGOUT_END:
            return userInit;

        case types.LOGIN_START:
        case types.SIGNUP_START:
        case types.GET_USER_START:
        case types.SIGNUP_SUCCESS:
        case types.SIGNUP_ERROR:
        case types.GET_USER_ERROR:
        case types.LOGIN_ERROR:
            return userInit;

        default:
            return state;
    }
};

export default user;
