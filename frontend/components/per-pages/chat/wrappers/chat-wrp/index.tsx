import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { IChats, IChatsList, IState } from '../../../../../interfaces';
import ChatsLoaders from '../../../../common/loaders/skeletons/chats';
import ChatEmpty from '../../chat-empty';
import ChatLoading from '../../chat-loading';
import ChatSearch from '../../chat-search';
import ChatSidebar from '../../chat-sidebar';
import useWrapperStyles from '../wrappers.styles';

// HELPER HIDE/SHOW CHAT CONVERSATION
interface ChatWrpShowConversationProps {
    show?: boolean;
    children: ReactElement | null;
}
const ChatWrpShowConversation = ({ show = false, children }: ChatWrpShowConversationProps): ReactElement | null =>
    show ? children : null;

// HELPER HIDE/SHOW CHAT CONVERSATION
interface ChatWrpShowLoaderProps {
    children: ReactElement | null;
    loading: boolean;
    data: IChats[];
}
const ChatWrpShowLoader = ({ loading, data, children }: ChatWrpShowLoaderProps): ReactElement | null =>
    loading ? <ChatLoading /> : data.length ? children : <ChatEmpty />;

interface IProps {
    children: ReactElement | null;
    showConversation?: boolean;
}

// MAIN COMPONENT
const ChatWrp = ({ children, showConversation = false }: IProps): ReactElement => {
    const css = useWrapperStyles();
    const chats = useSelector<IState, IChatsList>(state => state.chat.chats);

    return (
        <>
            <div className={clsx(css.root, css.sidebar)}>
                <aside className={css.aside}>
                    <div className={css.inner}>
                        <ChatSearch />
                        {chats.loading ? <ChatsLoaders amount={5} /> : <ChatSidebar chats={chats.data.data} />}
                    </div>
                </aside>

                <ChatWrpShowConversation show={showConversation}>
                    <ChatWrpShowLoader data={chats.data.data} loading={chats.loading}>
                        {children}
                    </ChatWrpShowLoader>
                </ChatWrpShowConversation>
            </div>
        </>
    );
};

export default ChatWrp;
