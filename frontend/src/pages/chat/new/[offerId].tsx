import React, { ReactElement, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import AuthRedirect from '../../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../../components/common/auth/get-static-profile/get-static-profile';
import Button from '../../../components/common/button';
import Header from '../../../components/layout/header';
import Meta from '../../../components/meta';
import Conversation from '../../../components/pages/chat/chat-conversation';
import NewChatWrp from '../../../components/pages/chat/components/wrappers/new-chat-wrp';
import { useChatListUpdate } from '../../../hooks/chat.hook';
import useMedia from '../../../hooks/media.hook';
import useTrans from '../../../hooks/trans.hook';
import types from '../../../redux/types';
import routes from '../../../utils/routes';
import mixin from '../../../utils/theming/mixin';
import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 'calc(100vh - 6rem)',
        paddingTop: theme.rem(1),
        background: theme.palette.white,

        ...theme.media(1060).max({
            height: 'auto',
            padding: theme.rem(1, 0, 8),
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
        ...mixin(theme).btn,
        minWidth: theme.rem(15),
        marginTop: theme.rem(2),
    },
}));

const NewChat = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();
    const media = useMedia(1060);

    const history = useRouter();
    const offerId = String(history.query.offerId || '');

    const [loading, setLoading] = useState<boolean>(false);

    useChatListUpdate();
    useEffect(() => {
        dispatch({ type: types.REMOVE_ALL_MESSAGES });
    }, [dispatch]);

    const handleCreateChat = (): void => {
        setLoading(true);
        dispatch({
            type: types.CREATE_CHAT_START,
            payload: { offer_id: offerId },
            callback: (id: number) => {
                setLoading(false);
                history.push(routes.chat.item(id));
            },
        });
    };

    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta title={'Мои сообщения'} h1={trans('user_profile_on_phoqer')} />

                <Header />

                <main className={css.main}>
                    <NewChatWrp showSidebar={media}>
                        <Conversation>
                            <div className={css.center}>
                                <p>
                                    Чтобы арендовать этот товар/услугу нажмите &quot;Ok&quot;. После этого вы откроете чат с
                                    автором объявления
                                </p>
                                <Button loading={loading} className={css.button} onClick={handleCreateChat}>
                                    Ok
                                </Button>
                            </div>
                        </Conversation>
                    </NewChatWrp>
                </main>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default NewChat;
