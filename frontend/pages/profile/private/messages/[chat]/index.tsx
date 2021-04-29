import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../../assets/helpers';
import routes from '../../../../../assets/routes';
import { Theme } from '../../../../../assets/theme';
import ProfileChatNav from '../../../../../components/common/user-nav/profile/chat-nav';
import AuthRedirect from '../../../../../components/context/auth/auth-redirect';
import Meta from '../../../../../components/layout/meta';
import ChatBackBtn from '../../../../../components/pages/profile/private/messages/chat-back-btn';
import Conversation from '../../../../../components/pages/profile/private/messages/chat-conversation';
import ChatWrp from '../../../../../components/pages/profile/private/messages/chat-wrp';
import useMedia from '../../../../../hooks/media.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { wrapper } from '../../../../../redux/store';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: theme.rem(0, 1, 2),
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

                <ChatWrp showSidebar={media} showConversation={true}>
                    <Conversation />
                </ChatWrp>
            </main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        if (serverRedirect((ctx as unknown) as GetServerSidePropsContext)) return;
    },
);

export default MessagesChat;
