import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../../../../../assets/theme';
import { IMessagesList, IPublicProfile, IState } from '../../../../../../../interfaces';

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
        minHeight: '100%',
        padding: theme.rem(4, 1, 1),

        ...theme.media(1060).max({
            padding: theme.rem(2, 1.5, 4),
        }),
    },
    messages: {
        width: 'max-content',
        maxWidth: '60%',
        margin: theme.rem(0.5, 1),
        padding: theme.rem(1, 2),
        background: theme.palette.white,
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
    },
    right: {
        alignSelf: 'flex-end',
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
    },
}));
const ChatFlow = (): ReactElement => {
    const css = useStyles();

    const user = useSelector<IState, IPublicProfile>(state => state.user);
    const messages = useSelector<IState, IMessagesList>(state => state.chat.messages);

    return (
        <div className={css.root}>
            <div className={css.inner}>
                {messages.data.data.length
                    ? messages.data.data.map<ReactElement>(item => (
                          <div key={item.id} className={clsx(css.messages, user.id === item.user_id && css.right)}>
                              {item.text}
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default ChatFlow;
