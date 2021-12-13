import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import Header from '../../components/layout/header';
import Meta from '../../components/meta';
import { width } from '../../components/pages/chat/chat.config';
import ChatNavbar from '../../components/pages/chat/components/chat-navbar';
import ChatWrp from '../../components/pages/chat/components/wrappers/chat-wrp';
import { useChatListUpdate } from '../../hooks/chat.hook';
import useMedia from '../../hooks/media.hook';
import useTrans from '../../hooks/trans.hook';
import { Theme } from '../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100vh',
        paddingTop: theme.rem(6),
        background: theme.palette.white,

        ...theme.media(1060).max({
            height: 'auto',
            padding: theme.rem(6, 0, 8),
        }),
    },
    chat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100% - 2rem)',
        width: width.desktopLg.center,
        background: theme.palette.gray[0],
        borderRadius: theme.radius,

        ...theme.media(1500).max({
            width: width.desktopMd.center,
        }),

        ...theme.media(1300).max({
            width: width.desktopSm.center,
        }),
    },
    inner: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: theme.palette.gray[3],
    },
    img: {
        width: theme.rem(28),
        height: 'auto',
        marginBottom: theme.rem(2),
        objectFit: 'contain',
    },
}));

const Messages = (): ReactElement => {
    useChatListUpdate();

    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(1060);

    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta title={'Мои сообщения'} h1={trans('user_profile_on_phoqer')} />
                <Header />
                <ChatNavbar />
                <main className={css.main}>
                    <ChatWrp showConversation={media}>
                        <div className={css.chat}>
                            <div className={css.inner}>
                                <img className={css.img} src="/icons/chat.png" alt="" />
                                <p>Select the chat in side panel</p>
                            </div>
                        </div>
                    </ChatWrp>
                </main>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default Messages;
