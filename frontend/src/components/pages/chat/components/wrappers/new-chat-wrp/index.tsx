import React, { ReactElement, useEffect, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import useMedia from '../../../../../../hooks/media.hook';
import { ChatStatus, IChats, IChatsList, IOfferCard, IPublicProfile, IState } from '../../../../../../interfaces';
import types from '../../../../../../redux/types';
import routes from '../../../../../../utils/routes';
import ChatsLoaders from '../../../../../common/loaders/skeletons/chats';
import notifications from '../../../../../common/notifications';
import ChatSidebarLeft from '../../../chat-sidebar-left';
import ChatSidebarRight from '../../../chat-sidebar-right';
import ChatLoading from '../../chat-loading';
import ChatSearch from '../../chat-search';
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
const NewChatWrp = ({ children, showSidebar = false }: IProps): ReactElement => {
    const css = useWrapperStyles();
    const dispatch = useDispatch();
    const history = useRouter();
    const desktop = useMedia(1500);
    const offerId = String(history.query.offerId || '');

    const [newChat, setNewChat] = useState<IChats>({
        chat_id: 0,
        title: 'loading...',
        recipient_id: 0,
        status: ChatStatus.NEW,
        recipient_first_name: 'loading...',
        recipient_last_name: 'loading...',
        recipient_last_activity: 'loading...',
        new_messages: 0,
        cover_image: null,
    });

    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const chats = useSelector<IState, IChatsList>(state => state.chat.chats);
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    useEffect(() => {
        if (offerId) dispatch({ type: types.GET_SINGLE_OFFER_START, payload: offerId });
    }, [dispatch, offerId]);

    useEffect(() => {
        if (user?.id === offer?.author_id) {
            history.replace(routes.root);
            notifications.info({ title: 'Внимание!', message: 'Вы не можете арендовать свое объявление' });
        } else {
            if (offer) dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: offer.author_id });
        }
    }, [dispatch, history, offer, user]);

    useEffect(() => {
        if (offer && profile) {
            setNewChat({
                chat_id: 0,
                title: offer.title,
                status: ChatStatus.NEW,
                recipient_id: offer.author_id,
                recipient_first_name: profile.first_name || '-',
                recipient_last_name: profile.last_name || '-',
                recipient_last_activity: profile.last_activity || '-',
                new_messages: 0,
                cover_image: offer.cover_image,
            });
        }
    }, [offer, profile]);

    const loading = chats.loading || !offer || !profile;
    const data = [newChat, ...chats.data.data];

    return (
        <>
            <div className={clsx(css.root, css.sidebar)}>
                <MessagesWrpShowSidebar show={showSidebar}>
                    <aside className={css.aside}>
                        <div className={css.inner}>
                            <ChatSearch />
                            {chats.loading ? <ChatsLoaders amount={5} /> : <ChatSidebarLeft chats={data} />}
                        </div>
                    </aside>
                </MessagesWrpShowSidebar>

                <MessagesWrpShowLoader loading={loading}>{children}</MessagesWrpShowLoader>

                {desktop && (
                    <aside className={css.aside}>
                        <ChatSidebarRight />
                    </aside>
                )}
            </div>
        </>
    );
};

export default NewChatWrp;
