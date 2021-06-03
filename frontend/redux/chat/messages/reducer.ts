import { IMessages, IMessagesList, IPagination } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction from './interfaces';

const messages = (state: IMessagesList = initState.chat.messages, { type, payload }: IAction): IMessagesList => {
    switch (type) {
        case types.GET_MESSAGES_START:
            return { ...state, loading: true };

        case types.GET_MESSAGES_SUCCESS:
            return { data: payload as IPagination<IMessages>, loading: false };

        case types.GET_MESSAGES_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default messages;
