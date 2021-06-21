import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { IChats, IChatsList, IOfferCard, IPublicProfile, IState } from '../../../../../interfaces';
import types from '../../../../../redux/types';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';
import ChatsLoaders from '../../../../common/loaders/skeletons/chats';
import notifications from '../../../../common/notifications';
import ChatLoading from '../../chat-loading';
import ChatSearch from '../../chat-search';
import ChatSidebar from '../../chat-sidebar';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: 'calc(100vh - 6.5rem)',
        flexGrow: 2,
        padding: theme.rem(0, 2),
        fontSize: theme.rem(1.6),
        color: theme.palette.black[0],

        ...theme.media(1060).max({
            height: 'unset',
            padding: theme.rem(0, 0, 1),
        }),
    },
    sidebar: theme.media(1060).max({
        height: 'unset',
    }),
    aside: {
        minWidth: theme.rem(40),
        maxWidth: theme.rem(40),
        height: '99%',
        paddingRight: theme.rem(0.5),
        marginRight: theme.rem(0.5),
        overflow: 'auto',

        ...theme.media(1060).max({
            minWidth: 'unset',
            maxWidth: 'unset',
            height: 'unset',
            width: '100%',
            padding: theme.rem(0, 1.5),
            overflow: 'unset',
        }),
    },
    inner: {
        height: 'auto',
        padding: theme.rem(0.1),
        ...theme.media(1060).max({
            height: 'unset',
        }),
    },
}));

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
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useRouter();
    const offerId = String(history.query.offerId || '');

    const [newChat, setNewChat] = useState<IChats>({
        chat_id: 0,
        title: 'loading...',
        recipient_id: 0,
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
                            {chats.loading ? <ChatsLoaders amount={5} /> : <ChatSidebar chats={data} />}
                        </div>
                    </aside>
                </MessagesWrpShowSidebar>

                <MessagesWrpShowLoader loading={loading}>{children}</MessagesWrpShowLoader>
            </div>
        </>
    );
};

export default NewChatWrp;
