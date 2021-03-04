import { IAuth, IState, Login } from '../../../interfaces';
import types from '../../types';

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

export default interface IAction {
    type: Type;
    payload?: IAuth | IState | Login | null;
}
