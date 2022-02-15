import React, { ReactElement, useEffect, useRef } from 'react';

import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import useMedia from '../../../../../hooks/media.hook';
import { IMessagesList, IPublicProfile, IState } from '../../../../../interfaces';
import { Theme } from '../../../../../utils/theming/theme';
import ChatEmpty from '../../components/chat-empty';

import ChatFlowList from './chat-flow-list';
import ChatLoadMore from './chat-load-more';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        flexGrow: 2,
        height: '100%',
        width: '100%',
        marginBottom: theme.rem(1),
        borderRadius: theme.radius,
        background: theme.palette.gray[0],
        overflow: 'auto',
        transition: theme.transitions[1],

        '&.appear, &.exit': {
            transform: 'translateY(2rem)',
            opacity: 0,
        },
        '&.appear-done': {
            transform: 'translateY(0)',
            opacity: 1,
        },

        ...theme.media(1060).max({
            borderRadius: '0',
        }),
    },
    inner: {
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        minHeight: 'calc(100vh - 12rem)',
        padding: theme.rem(4, 1, 1),

        ...theme.media(1060).max({
            padding: theme.rem(2, 1.5, 4),
        }),
    },
}));

const ChatFlow = (): ReactElement => {
    const css = useStyles();
    const media = useMedia(1060);
    const ref = useRef<HTMLDivElement | null>(null);

    const user = useSelector<IState, IPublicProfile>(state => state.user);
    const messages = useSelector<IState, IMessagesList>(state => state.chat.messages);

    useEffect(() => {
        if (ref.current) {
            setTimeout(() => {
                media
                    ? ref.current?.scrollTo({ top: (ref.current?.children?.[0] as HTMLDivElement)?.offsetHeight || 0 })
                    : window.scrollTo({ top: ref.current?.offsetHeight || 0 });
            }, 100);
        }
    }, [media, ref]);

    return (
        <CSSTransition timeout={300} in appear exit>
            <div id="chat-scroll" ref={ref} className={css.root}>
                <div className={css.inner}>
                    {messages.data.data.length ? (
                        <>
                            <ChatFlowList user={user} messages={messages} />
                            <ChatLoadMore messages={messages} />
                        </>
                    ) : (
                        <ChatEmpty />
                    )}
                </div>
            </div>
        </CSSTransition>
    );
};

export default ChatFlow;
