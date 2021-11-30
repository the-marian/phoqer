import { IChatItem, IChats } from '../../../interfaces';
import chatInit from '../init-state';
import types from '../types';

import IAction from './interfaces';

const info = (state: IChatItem = chatInit.item, { type, payload }: IAction): IChatItem => {
    switch (type) {
        case types.GET_CHAT_ITEM_START:
            return { ...state, loading: true };

        case types.GET_CHAT_ITEM_SUCCESS:
        case types.UPDATE_CHAT_SUCCESS:
            return { data: payload as IChats, loading: false };

        case types.GET_CHAT_ITEM_ERROR:
            return { data: null, loading: false };

        default:
            return state;
    }
};

export default info;
