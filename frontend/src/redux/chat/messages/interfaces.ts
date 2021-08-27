import { IMessages, IPagination } from '../../../interfaces';
import types from '../../types';

type Type =
    | typeof types.GET_MESSAGES_START
    | typeof types.GET_MESSAGES_ERROR
    | typeof types.GET_MESSAGES_SUCCESS
    | typeof types.LOAD_MORE_MESSAGES_START
    | typeof types.LOAD_MORE_MESSAGES_SUCCESS
    | typeof types.LOAD_MORE_MESSAGES_ERROR;

export default interface IAction {
    type: Type;
    payload: IPagination<IMessages> | IMessages | number;
    page?: number;
}
