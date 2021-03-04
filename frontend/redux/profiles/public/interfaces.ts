import { IState } from '../../../interfaces';
import types from '../../types';

type Type =
    | typeof types.GET_PUBLIC_PROFILE_START
    | typeof types.GET_PUBLIC_PROFILE_ERROR
    | typeof types.GET_PUBLIC_PROFILE_SUCCESS;

export default interface IAction {
    type: Type;
    payload: number | IState | null | string;
}
