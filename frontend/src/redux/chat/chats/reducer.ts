import { ChatType, IChats, IChatsList, IPagination } from '../../../interfaces';
import chatInit from '../init-state';
import types from '../types';

import IAction from './interfaces';

const chats = (state: IChatsList = chatInit.chats, { type, payload }: IAction): IChatsList => {
    switch (type) {
        case types.GET_CHATS_START:
            return { ...state, loading: true };

        case types.GET_CHATS_SUCCESS:
        case types.REFRESH_CHATS_SUCCESS:
            return { ...state, data: payload as IPagination<IChats>, loading: false };

        case types.GET_CHATS_ERROR:
        case types.REFRESH_CHATS_ERROR:
            return { ...state, loading: false };

        case types.CHANGE_CHAT_TYPE:
            return { ...state, type: payload as ChatType };

        default:
            return state;
    }
};

export default chats;
