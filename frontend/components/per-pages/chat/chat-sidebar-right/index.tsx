import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IChatOfferInfo, IPublicProfile, IState } from '../../../../interfaces';
import { Theme } from '../../../../utils/theming/theme';
import Banner from '../../../common/advertising/banner';
import { width } from '../chat.config';
import ChatConfirmation from './chat-confirmation';
import ChatDrawerSkeleton from './chat-drawer-skeleton';
import ChatOfferInfo from './chat-offer-info';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        width: width.desktopLg.sidebar,
        height: '100%',

        ...theme.media(1500).max({
            width: '100%',
            paddingTop: theme.rem(4),
        }),
    },
    banner: {
        height: 'calc(100vh - 10rem)',
        padding: theme.rem(18, 4),
    },
}));

const ChatSidebarRight = (): ReactElement => {
    const css = useStyles();
    const user = useSelector<IState, IPublicProfile | null>(state => state.user);
    const offerInfo = useSelector<IState, IChatOfferInfo>(state => state.chat.info);

    return (
        <div className={css.root}>
            {!offerInfo?.data ? (
                <Banner className={css.banner} />
            ) : offerInfo?.loading ? (
                <ChatDrawerSkeleton />
            ) : offerInfo.data.author_id === user?.id ? (
                <ChatConfirmation />
            ) : (
                <ChatOfferInfo />
            )}
        </div>
    );
};

export default ChatSidebarRight;
