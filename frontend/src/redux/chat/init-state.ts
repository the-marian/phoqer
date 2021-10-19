import { IStateChats } from '../../interfaces';

const chatInit: IStateChats = {
    chats: {
        loading: true,
        type: 'i_am_client',
        data: {
            total: 0,
            data: [],
        },
    },
    messages: {
        loading: true,
        data: {
            total: 0,
            data: [],
        },
    },
    info: {
        loading: true,
        data: null,
    },
};

export default chatInit;