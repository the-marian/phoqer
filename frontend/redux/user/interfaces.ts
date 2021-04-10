import { IAuth, IPublicProfile } from '../../interfaces';
import types from '../types';

type Type =
    | typeof types.LOGIN_START
    | typeof types.LOGIN_ERROR
    | typeof types.LOGIN_SUCCESS
    | typeof types.GET_USER_START
    | typeof types.GET_USER_ERROR
    | typeof types.GET_USER_SUCCESS
    | typeof types.LOGOUT_INIT
    | typeof types.LOGOUT_END;

export default interface IAction {
    type: Type;
    payload?: IAuth | IPublicProfile;
}
