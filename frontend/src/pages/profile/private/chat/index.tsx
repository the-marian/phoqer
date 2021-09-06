import React, { ReactElement, useEffect } from 'react';

import { GetServerSidePropsContext } from 'next';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import AuthRedirect from '../../../../components/context/auth/auth-redirect';
import Meta from '../../../../components/meta';
import { width } from '../../../../components/pages/chat/chat.config';
import ChatBackBtn from '../../../../components/pages/chat/components/chat-back-btn';
import ChatTabs from '../../../../components/pages/chat/components/chat-tabs';
import ChatWrp from '../../../../components/pages/chat/components/wrappers/chat-wrp';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';
import types from '../../../../redux/types';
import { serverRedirect } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100vh',
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
        width: width.desktopLg.center,
        background: theme.palette.gray[0],
        borderRadius: theme.radius,

        ...theme.media(1500).max({
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
        height: theme.rem(5),
        width: theme.rem(5),
        marginBottom: theme.rem(2),
    },
}));

const Messages = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(1060);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: types.GET_CHATS_START });
        dispatch({ type: types.RESET_CHAT_SIDEBAR });
    }, [dispatch]);

    return (
        <>
            <AuthRedirect />
            <Meta title={'Мои сообщения'} h1={trans('user_profile_on_phoqer')} />

            <main className={css.main}>
                {media ? <ChatTabs /> : <ChatBackBtn href={routes.profile.private.personal_area}>Back to profile</ChatBackBtn>}
                <ChatWrp showConversation={media}>
                    <div className={css.chat}>
                        <div className={css.inner}>
                            <img className={css.img} src="/emoji/chat.png" alt="" />
                            <p>Select the chat in side panel</p>
                        </div>
                    </div>
                </ChatWrp>
            </main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx): Promise<void> => {
    if (serverRedirect(ctx as unknown as GetServerSidePropsContext)) return;
});

export default Messages;
