import React, { ReactElement, useEffect } from 'react';

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import notifications from '../../../../../components/common/notifications';
import AuthRedirect from '../../../../../components/context/auth/auth-redirect';
import Meta from '../../../../../components/meta';
import Conversation from '../../../../../components/pages/chat/chat-conversation';
import ChatMobileDrawer from '../../../../../components/pages/chat/chat-sidebar-right/chat-drawer';
import ChatMobileDrawerButton from '../../../../../components/pages/chat/chat-sidebar-right/chat-drawer/chat-drawer-button';
import ChatBackBtn from '../../../../../components/pages/chat/components/chat-back-btn';
import ChatTabs from '../../../../../components/pages/chat/components/chat-tabs';
import MessagesWrp from '../../../../../components/pages/chat/components/wrappers/messages-wrp';
import useChat from '../../../../../hooks/chat.hook';
import useMedia from '../../../../../hooks/media.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { IChatsList, IMessages, IState } from '../../../../../interfaces';
import { wrapper } from '../../../../../redux/store';
import types from '../../../../../redux/types';
import { serverRedirect } from '../../../../../utils/helpers';
import routes from '../../../../../utils/routes';
import { Theme } from '../../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: theme.rem(0, 0, 2),
        height: '100vh',
        background: theme.palette.white,

        ...theme.media(1060).max({
            height: 'unset',
            padding: theme.rem(6, 0, 8),
        }),
    },
}));

const MessagesChat = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const desktop = useMedia(1500);
    const media = useMedia(1060);
    const history = useRouter();
    const chatId = +String(history.query.chat || '0');
    const chat = useChat(chatId);

    const dispatch = useDispatch();
    const chats = useSelector<IState, IChatsList>(state => state.chat.chats);

    useEffect(() => {
        if (chatId) dispatch({ type: types.GET_MESSAGES_START, payload: +chatId });
    }, [dispatch, chatId]);

    useEffect(() => {
        if (chats.loading) dispatch({ type: types.GET_CHATS_START });
    }, [dispatch, chats.loading]);

    useEffect(() => {
        if (chat && !chat.onmessage) {
            chat.onmessage = (message: MessageEvent): void => {
                try {
                    const payload: IMessages = JSON.parse(message.data);
                    dispatch({ type: types.RECEIVE_MESSAGE, payload });
                } catch (error) {
                    notifications.warning({ message: 'error' });
                }
            };
        }
    }, [dispatch, chat]);

    useEffect(() => {
        dispatch({ type: types.GET_CHAT_OFFER_INFO_START, payload: chatId });
    }, [dispatch, chatId]);

    const handleSubmit = (text: string, uploads: string[]): void => {
        if (chat) {
            try {
                const message: { text: string; uploads?: string[] } = { text };
                if (uploads?.length) message.uploads = uploads;
                const data = JSON.stringify(message);
                chat.send(data);
            } catch (error) {
                notifications.warning({ message: 'error' });
            }
        }
    };

    return (
        <>
            <AuthRedirect />
            <Meta title={'Мои сообщения'} h1={trans('user_profile_on_phoqer')} />

            <ChatMobileDrawer />
            {!desktop && <ChatMobileDrawerButton />}

            <main className={css.main}>
                {media ? <ChatTabs /> : <ChatBackBtn href={routes.profile.private.chat()}>Back to messages</ChatBackBtn>}
                <MessagesWrp showSidebar={media}>
                    <Conversation onSubmit={handleSubmit} />
                </MessagesWrp>
            </main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx): Promise<void> => {
    if (serverRedirect(ctx as unknown as GetServerSidePropsContext)) return;
});

export default MessagesChat;
