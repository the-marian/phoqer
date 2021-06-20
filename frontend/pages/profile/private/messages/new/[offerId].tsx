import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { serverRedirect } from '../../../../../assets/helpers';
import routes from '../../../../../assets/routes';
import Button from '../../../../../components/common/button';
import ProfileChatNav from '../../../../../components/common/navigation/profile-nav/chat-nav';
import AuthRedirect from '../../../../../components/context/auth/auth-redirect';
import Meta from '../../../../../components/meta';
import ChatBackBtn from '../../../../../components/pages/profile/private/messages/chat-back-btn';
import Conversation from '../../../../../components/pages/profile/private/messages/chat-conversation';
import NewChatWrp from '../../../../../components/pages/profile/private/messages/wrappers/new-chat-wrp';
import useMedia from '../../../../../hooks/media.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { wrapper } from '../../../../../redux/store';
import types from '../../../../../redux/types';
import template from '../../../../../theming/template';
import { Theme } from '../../../../../theming/theme';

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
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.rem(3, 0, 1),
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],
    },
    button: {
        ...template(theme).btn,
        minWidth: theme.rem(15),
        marginTop: theme.rem(2),
    },
}));

const NewChat = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const media = useMedia(1060);
    const history = useRouter();
    const offerId = String(history.query.offerId || '');
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        dispatch({ type: types.REMOVE_ALL_MESSAGES });
        dispatch({ type: types.GET_CHATS_START });
    }, [dispatch]);

    const handleCreateChat = (): void => {
        setLoading(true);
        dispatch({
            type: types.CREATE_CHAT_START,
            payload: { offer_id: offerId },
            callback: (id: number) => {
                setLoading(false);
                history.push(routes.profile.private.messages(id));
            },
        });
    };

    return (
        <>
            <AuthRedirect />
            <Meta title={'Мои сообщения'} h1={trans('user_profile_on_phoqer')} />

            <main className={css.main}>
                {media ? (
                    <ProfileChatNav active="messages" />
                ) : (
                    <ChatBackBtn href={routes.profile.private.personal_area}>Back to profile</ChatBackBtn>
                )}
                <NewChatWrp showSidebar={media}>
                    <Conversation>
                        <div className={css.center}>
                            <p>
                                Чтобы арендовать этот товар/услугу нажмите &quot;Ok&quot;. После этого вы откроете чат с автором
                                объявления
                            </p>
                            <Button loading={loading} className={css.button} onClick={handleCreateChat}>
                                Ok
                            </Button>
                        </div>
                    </Conversation>
                </NewChatWrp>
            </main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx): Promise<void> => {
    if (serverRedirect(ctx as unknown as GetServerSidePropsContext)) return;
});

export default NewChat;
