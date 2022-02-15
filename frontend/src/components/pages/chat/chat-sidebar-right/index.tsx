import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { IChatOfferInfo, IState } from '../../../../interfaces';
import { Theme } from '../../../../utils/theming/theme';
import Banner from '../../../common/advertising/banner';
import { width } from '../chat.config';

import ChatOfferInfo from './chat-offer-info';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        height: '100%',
        width: width.desktopLg.sidebar,
        paddingLeft: theme.rem(0.5),
        transition: theme.transitions[1],

        '&.appear, &.exit': {
            transform: 'translateY(2rem)',
            opacity: 0,
        },
        '&.appear-done': {
            transform: 'translateY(0)',
            opacity: 1,
        },

        ...theme.media(1500).max({
            width: width.desktopMd.sidebar,
        }),

        ...theme.media(1300).max({
            width: '100%',
            paddingLeft: '0',
            paddingTop: theme.rem(4),
        }),
    },
    banner: {
        height: 'calc(100vh - 12rem)',
        padding: theme.rem(18, 4),
    },
}));

const ChatSidebarRight = (): ReactElement => {
    const css = useStyles();

    const offerInfo = useSelector<IState, IChatOfferInfo>(state => state.chat.info);

    return (
        <CSSTransition timeout={300} in appear exit>
            <div className={css.root}>{!offerInfo?.data ? <Banner className={css.banner} /> : <ChatOfferInfo />}</div>
        </CSSTransition>
    );
};

export default ChatSidebarRight;
