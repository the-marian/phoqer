import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../../../../assets/theme';
import { IChats, IChatsList, IOfferCard, IPublicProfile, IState } from '../../../../../../interfaces';
import types from '../../../../../../redux/types';
import ChatsLoaders from '../../../../../common/loaders/skeletons/chats';
import ChatEmpty from '../chat-empty';
import ChatLoading from '../chat-loading';
import ChatSidebar from '../chat-sidebar';

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
        height: '100%',
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
    showConversation?: boolean;
    children: ReactElement | null;
}

// MAIN COMPONENT
const NewChatWrp = ({ children, showConversation = false }: IProps): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useRouter();
    const offerId = String(history.query.offerId || '');
    const authorId = String(history.query.authorId || '');

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
    const chats = useSelector<IState, IChatsList>(state => state.chat.chats);
    const offer = useSelector<IState, IOfferCard | null>(state => state.offers.single);
    const profile = useSelector<IState, IPublicProfile | null>(state => state.profiles.public);

    useEffect(() => {
        if (offerId) dispatch({ type: types.GET_SINGLE_OFFER_START, payload: offerId });
    }, [dispatch, offerId]);

    useEffect(() => {
        if (authorId) dispatch({ type: types.GET_PUBLIC_PROFILE_START, payload: authorId });
    }, [dispatch, authorId]);

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

    console.log({ chats: chats.loading, offer: !offer, profile: !profile });
    const loading = chats.loading || !offer || !profile;
    const data = [...chats.data.data, newChat];

    return (
        <>
            <div className={clsx(css.root, css.sidebar)}>
                <aside className={css.aside}>
                    <div className={css.inner}>{loading ? <ChatsLoaders amount={5} /> : <ChatSidebar chats={data} />}</div>
                </aside>

                <ChatWrpShowConversation show={showConversation}>
                    <ChatWrpShowLoader data={data} loading={loading}>
                        {children}
                    </ChatWrpShowLoader>
                </ChatWrpShowConversation>
            </div>
        </>
    );
};

export default NewChatWrp;
