import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    empty: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'calc(100vh - 8rem)',
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

interface IProps {
    height?: number;
}

const ChatEmpty = ({ height }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.empty} style={{ height: `${height}rem` }}>
            <img className={css.img} src="/emoji/empty.png" alt="" />
            <p>У вас пока нету сообщений</p>
        </div>
    );
};

export default ChatEmpty;
