import { IMessages, IPagination } from '../../../interfaces';
import types from '../../types';

type Type = typeof types.GET_MESSAGES_START | typeof types.GET_MESSAGES_ERROR | typeof types.GET_MESSAGES_SUCCESS;

export default interface IAction {
    type: Type;
    payload: IPagination<IMessages> | number;
}
