import { GetServerSidePropsContext } from 'next';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { serverRedirect } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import Meta from '../../../../components/Common/Meta';
import ProfileChatNav from '../../../../components/Common/NavTabs/ProfileChatNav';
import AuthRedirect from '../../../../components/HOC/Auth/AuthRedirect';
import ChatWrp from '../../../../components/Pages/Profile/Private/Messages/ChatWrp';
import useMedia from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import { wrapper } from '../../../../redux/store';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100vh',
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

const Messages = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();
    const media = useMedia(768);

    return (
        <>
            <Meta title={'Мои сообщения'} h1={T.user_profile_on_phoqer} />

            <AuthRedirect />
            <main className={css.main}>
                <ProfileChatNav active="messages" />
                <ChatWrp>
                    {media ? (
                        <div className={css.chat}>
                            <p>Select the chat in side panel</p>
                        </div>
                    ) : null}
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

export default Messages;
