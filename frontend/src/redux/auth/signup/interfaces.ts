import { ISignup, IState } from '../../../interfaces';
import types from '../../types';

type Type = typeof types.SIGNUP_START | typeof types.SIGNUP_SUCCESS | typeof types.SIGNUP_ERROR;

export default interface IAction {
    type: Type;
    payload?: IState | ISignup | null;
}
