import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../../assets/helpers';
import { Theme } from '../../../../../assets/theme';
import ProfileChatNav from '../../../../../components/common/nav-tabs/profile/chat-nav';
import AuthRedirect from '../../../../../components/context/auth/auth-redirect';
import Meta from '../../../../../components/layout/meta';
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
    },
    chat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
    },
}));

const MessagesChat = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();
    const media = useMedia(768);

    return (
        <>
            <Meta title={'Мои сообщения'} h1={T.user_profile_on_phoqer} />

            <AuthRedirect />
            <main className={css.main}>
                <ProfileChatNav active="messages" />
                <ChatWrp showSidebar={media} showConversation={true}>
                    <div className={css.chat}>
                        <Conversation />
                    </div>
                </ChatWrp>
            </main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        serverRedirect((ctx as unknown) as GetServerSidePropsContext);
    },
);

export default MessagesChat;
