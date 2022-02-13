import React, { ReactElement, useEffect } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import AuthRedirect from '../../../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../../../components/common/auth/get-static-profile/get-static-profile';
import notifications from '../../../../components/common/notifications';
import Header from '../../../../components/layout/header';
import Meta from '../../../../components/meta';
import Conversation from '../../../../components/pages/chat/chat-conversation';
import ChatMobileDrawer from '../../../../components/pages/chat/chat-sidebar-right/chat-drawer';
import ChatMobileDrawerButton from '../../../../components/pages/chat/chat-sidebar-right/chat-drawer/chat-drawer-button';
import { ChatHeader } from '../../../../components/pages/chat/components/chat-header';
import MessagesWrp from '../../../../components/pages/chat/components/wrappers/messages-wrp';
import useChat, { useChatListUpdate } from '../../../../hooks/chat.hook';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IMessages } from '../../../../interfaces';
import types from '../../../../redux/types';
import { Theme } from '../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: theme.rem(1, 0, 2),
        height: 'calc(100vh - 12rem)',
        background: theme.palette.white,

        ...theme.media(1060).max({
            height: 'unset',
            padding: theme.rem(1, 0, 8),
        }),
    },
}));

const MessagesChat = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const desktop = useMedia(1300);
    const media = useMedia(1060);

    const history = useRouter();
    const chatId = +String(history.query.chat || '0');
    const chat = useChat(chatId);

    const dispatch = useDispatch();

    useChatListUpdate();

    useEffect(() => {
        if (chatId) {
            dispatch({ type: types.GET_MESSAGES_START, payload: +chatId });
            dispatch({ type: types.GET_CHAT_ITEM_START, payload: +chatId });
        }
    }, [dispatch, chatId]);

    useEffect(() => {
        if (chat && !chat.onmessage) {
            chat.onmessage = (message: MessageEvent): void => {
                console.log(message);
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
        <AuthRedirect>
            <GetStaticProfile>
                <Meta title={'Мои сообщения'} h1={trans('user_profile_on_phoqer')} />

                <ChatMobileDrawer />
                {!desktop && <ChatMobileDrawerButton />}

                <Header />
                <ChatHeader />

                <main className={css.main}>
                    <MessagesWrp showSidebar={media}>
                        <Conversation onSubmit={handleSubmit} />
                    </MessagesWrp>
                </main>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default MessagesChat;
