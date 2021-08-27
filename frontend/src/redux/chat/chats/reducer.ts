import { IChats, IChatsList, IPagination } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';

import IAction from './interfaces';

const chats = (state: IChatsList = initState.chat.chats, { type, payload }: IAction): IChatsList => {
    switch (type) {
        case types.GET_CHATS_START:
            return { ...state, loading: true };

        case types.GET_CHATS_SUCCESS:
            return { data: payload as IPagination<IChats>, loading: false };

        case types.GET_CHATS_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default chats;
