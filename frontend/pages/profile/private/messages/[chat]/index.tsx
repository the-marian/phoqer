import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { serverRedirect } from '../../../../../assets/helpers';
import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import ProfileChatNav from '../../../../../components/common/navigation/profile-nav/chat-nav';
import AuthRedirect from '../../../../../components/context/auth/auth-redirect';
import Meta from '../../../../../components/layout/meta';
import ChatBackBtn from '../../../../../components/pages/profile/private/messages/chat-back-btn';
import Conversation from '../../../../../components/pages/profile/private/messages/chat-conversation';
import MessagesWrp from '../../../../../components/pages/profile/private/messages/wrappers/messages-wrp';
import useChat from '../../../../../hooks/chat.hook';
import useMedia from '../../../../../hooks/media.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { IChatsList, IState } from '../../../../../interfaces';
import { wrapper } from '../../../../../redux/store';
import types from '../../../../../redux/types';

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
    const media = useMedia(1060);
    const history = useRouter();
    const chatId = +String(history.query.chat || '0');
    const chat = useChat(chatId);

    const dispatch = useDispatch();
    const chats = useSelector<IState, IChatsList>(state => state.chat.chats);

    useEffect(() => {
        if (chats.loading) dispatch({ type: types.GET_CHATS_START });
        if (chatId) dispatch({ type: types.GET_MESSAGES_START, payload: +chatId });
    }, [dispatch, chatId]);

    useEffect(() => {
        if (chat) {
            chat.onmessage = event => {
                console.log(event);
            };
        }
    }, [chat]);

    return (
        <>
            <Meta title={'Мои сообщения'} h1={trans('user_profile_on_phoqer')} />

            <AuthRedirect />
            <main className={css.main}>
                {media ? (
                    <ProfileChatNav active="messages" />
                ) : (
                    <ChatBackBtn href={routes.profile.private.messages()}>Back to messages</ChatBackBtn>
                )}

                <MessagesWrp showSidebar={media}>
                    <Conversation />
                </MessagesWrp>
            </main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx): Promise<void> => {
    if (serverRedirect(ctx as unknown as GetServerSidePropsContext)) return;
});

export default MessagesChat;
