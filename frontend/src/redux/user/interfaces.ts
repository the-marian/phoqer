import { IAuth, IPublicProfile } from '../../interfaces';
import types from '../types';

type Type =
    | typeof types.LOGIN_START
    | typeof types.LOGIN_ERROR
    | typeof types.LOGIN_SUCCESS
    | typeof types.GET_USER_START
    | typeof types.GET_USER_ERROR
    | typeof types.GET_USER_SUCCESS
    | typeof types.UPDATE_USER_START
    | typeof types.UPDATE_USER_ERROR
    | typeof types.UPDATE_USER_SUCCESS
    | typeof types.UPDATE_USER_AVATAR_START
    | typeof types.UPDATE_USER_AVATAR_ERROR
    | typeof types.UPDATE_USER_AVATAR_SUCCESS;

export default interface IAction {
    type: Type;
    payload?: IAuth | IPublicProfile | File;
    callback?: () => void;
}
