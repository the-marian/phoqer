import { ChatTypeEnum, IStateChats } from '../../interfaces';

const chatInit: IStateChats = {
    chats: {
        loading: true,
        type: ChatTypeEnum.CLIENT,
        data: {
            total: 0,
            data: [],
        },
    },
    item: {
        loading: true,
        data: null,
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
