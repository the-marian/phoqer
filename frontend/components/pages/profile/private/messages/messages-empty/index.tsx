import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import ChatForm from '../chat-conversation/chat-form';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: 'calc(100vh - 6.5rem)',
    },
    empty: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 2,
        width: '100%',
        height: '100%',
        marginBottom: theme.rem(1),
        padding: theme.rem(2),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        textAlign: 'center',
        color: theme.palette.gray[2],
    },
    img: {
        height: theme.rem(8),
        width: theme.rem(8),
        marginBottom: theme.rem(2),
    },
}));

const MessagesEmpty = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.root}>
            <div className={css.empty}>
                <img className={css.img} src="/emoji/empty.png" alt="" />
                <p>У вас пока нету сообщений</p>
                <p>Напишите ваше первое сообщение</p>
            </div>
            <ChatForm />
        </div>
    );
};

export default MessagesEmpty;
