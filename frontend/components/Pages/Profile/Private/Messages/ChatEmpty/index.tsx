import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    empty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.rem(1, 0, 2),
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

const ChatEmpty = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.empty}>
            <img className={css.img} src="/emoji/empty.png" alt="" />
            <p>У вас пока нету сообщений</p>
        </div>
    );
};

export default ChatEmpty;
