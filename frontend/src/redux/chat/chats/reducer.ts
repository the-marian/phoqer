import { ChatTypeEnum, IChats, IChatsList, IPagination } from '../../../interfaces';
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

        case types.DELETE_CHAT_SUCCESS:
            return {
                ...state,
                data: { ...state.data, data: state.data.data.filter(item => item.chat_id !== (payload as number)) },
                loading: false,
            };

        case types.GET_CHATS_ERROR:
        case types.REFRESH_CHATS_ERROR:
            return { ...state, loading: false };

        case types.CHANGE_CHAT_TYPE:
            return { ...state, type: payload as ChatTypeEnum };

        default:
            return state;
    }
};

export default chats;
