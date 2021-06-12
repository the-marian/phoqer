import { IMessages, IMessagesList, IPagination } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction from './interfaces';

const messages = (state: IMessagesList = initState.chat.messages, { type, payload }: IAction): IMessagesList => {
    switch (type) {
        case types.GET_MESSAGES_START:
            return { ...state, loading: true };

        case types.REMOVE_ALL_MESSAGES:
            return { data: initState.chat.messages.data, loading: false };

        case types.RECEIVE_MESSAGE:
            return { data: { ...state.data, data: [payload as IMessages, ...state.data.data] }, loading: false };

        case types.GET_MESSAGES_SUCCESS:
            return { data: payload as IPagination<IMessages>, loading: false };

        case types.GET_MESSAGES_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default messages;
