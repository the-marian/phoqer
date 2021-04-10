import { IPublicProfile } from '../../interfaces';
import initState from '../state';
import types from '../types';
import IAction from './interfaces';

const user = (state: IPublicProfile = initState.user, { type, payload }: IAction): IPublicProfile => {
    switch (type) {
        case types.GET_USER_SUCCESS:
            return payload as IPublicProfile;

        case types.LOGOUT_END:
            return initState.user;

        case types.LOGIN_START:
        case types.SIGNUP_START:
        case types.GET_USER_START:
        case types.SIGNUP_SUCCESS:
        case types.SIGNUP_ERROR:
        case types.GET_USER_ERROR:
        case types.LOGIN_ERROR:
            return initState.user;

        default:
            return state;
    }
};

export default user;
