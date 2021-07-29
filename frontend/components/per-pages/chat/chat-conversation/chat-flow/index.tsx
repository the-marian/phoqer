import React, { ReactElement, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import useMedia from '../../../../../hooks/media.hook';
import { IMessagesList, IPublicProfile, IState } from '../../../../../interfaces';
import { Theme } from '../../../../../utils/theming/theme';
import ChatEmpty from '../../components/chat-empty';
import ChatInitConversation from '../chat-init-conversation';
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

        ...theme.media(1060).max({
            borderRadius: '0',
        }),
    },
    inner: {
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        minHeight: 'calc(100vh - 14rem)',
        padding: theme.rem(4, 1, 1),

        ...theme.media(1060).max({
            padding: theme.rem(2, 1.5, 4),
        }),
    },
}));

interface IProps {
    children?: ReactElement;
}

const ChatFlow = ({ children }: IProps): ReactElement => {
    const css = useStyles();
    const media = useMedia(1060);
    const ref = useRef<HTMLDivElement | null>(null);

    const user = useSelector<IState, IPublicProfile>(state => state.user);
    const messages = useSelector<IState, IMessagesList>(state => state.chat.messages);

    useEffect(() => {
        if (ref.current) {
            media
                ? ref.current?.scrollTo({ top: (ref.current?.children?.[0] as HTMLDivElement)?.offsetHeight || 0 })
                : window.scrollTo({ top: ref.current?.offsetHeight || 0 });
        }
    }, [media, ref]);

    return (
        <div ref={ref} className={css.root}>
            <div className={css.inner}>
                {messages.data.data.length ? (
                    <>
                        <ChatFlowList user={user} messages={messages} />
                        <ChatLoadMore messages={messages} />
                    </>
                ) : null}
                <ChatInitConversation>{children || <ChatEmpty />}</ChatInitConversation>
            </div>
        </div>
    );
};

export default ChatFlow;
