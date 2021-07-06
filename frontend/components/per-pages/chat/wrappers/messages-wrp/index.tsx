import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { IChatsList, IMessagesList, IState } from '../../../../../interfaces';
import ChatsLoaders from '../../../../common/loaders/skeletons/chats';
import ChatLoading from '../../chat-loading';
import ChatSearch from '../../chat-search';
import ChatSidebar from '../../chat-sidebar';
import useWrapperStyles from '../wrappers.styles';

// HELPER HIDE/SHOW CHAT SIDEBAR
interface MessagesWrpShowSidebarProps {
    children: ReactElement | null;
    show: boolean;
}
const MessagesWrpShowSidebar = ({ show, children }: MessagesWrpShowSidebarProps): ReactElement | null => (show ? children : null);

// HELPER HIDE/SHOW CHAT CONVERSATION
interface MessagesWrpShowLoaderProps {
    children: ReactElement | null;
    loading: boolean;
}
const MessagesWrpShowLoader = ({ loading, children }: MessagesWrpShowLoaderProps): ReactElement | null =>
    loading ? <ChatLoading /> : children;

interface IProps {
    children: ReactElement | null;
    showSidebar?: boolean;
}

// MAIN COMPONENT
const MessagesWrp = ({ children, showSidebar = false }: IProps): ReactElement => {
    const css = useWrapperStyles();
    const chats = useSelector<IState, IChatsList>(state => state.chat.chats);
    const messages = useSelector<IState, IMessagesList>(state => state.chat.messages);

    return (
        <>
            <div className={clsx(css.root, showSidebar && css.sidebar)}>
                <MessagesWrpShowSidebar show={showSidebar}>
                    <aside className={css.aside}>
                        <div className={css.inner}>
                            <ChatSearch />
                            {chats.loading ? <ChatsLoaders amount={5} /> : <ChatSidebar chats={chats.data.data} />}
                        </div>
                    </aside>
                </MessagesWrpShowSidebar>

                <MessagesWrpShowLoader loading={messages.loading}>{children}</MessagesWrpShowLoader>
            </div>
        </>
    );
};

export default MessagesWrp;
