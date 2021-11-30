import { ChatStatus, IChats } from '../../../interfaces';
import types from '../types';

type Type =
    | typeof types.GET_CHAT_ITEM_START
    | typeof types.GET_CHAT_ITEM_ERROR
    | typeof types.GET_CHAT_ITEM_SUCCESS
    | typeof types.UPDATE_CHAT_START
    | typeof types.UPDATE_CHAT_ERROR
    | typeof types.UPDATE_CHAT_SUCCESS
    | typeof types.DELETE_CHAT_START
    | typeof types.DELETE_CHAT_ERROR
    | typeof types.DELETE_CHAT_SUCCESS;

export default interface IAction {
    type: Type;
    payload: IChats | number;
    status: ChatStatus;
    callback: () => void;
}
