import { ChatTypeEnum, IChats, IPagination, IState } from '../../../interfaces';
import types from '../types';

type Type =
    | typeof types.GET_CHATS_START
    | typeof types.GET_CHATS_ERROR
    | typeof types.GET_CHATS_SUCCESS
    | typeof types.REFRESH_CHATS_START
    | typeof types.REFRESH_CHATS_ERROR
    | typeof types.REFRESH_CHATS_SUCCESS;

export interface INewChat {
    id: number;
}

export default interface IAction {
    type: Type;
    payload: IState | IPagination<IChats> | INewChat | ChatTypeEnum | number;
    callback?: (id: number) => void;
}
