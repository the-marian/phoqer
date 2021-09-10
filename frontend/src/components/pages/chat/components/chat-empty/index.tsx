import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../utils/theming/theme';
import { width } from '../../chat.config';

const useStyles = createUseStyles((theme: Theme) => ({
    empty: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 8rem)',
        width: width.desktopLg.center,
        padding: theme.rem(2),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        textAlign: 'center',
        color: theme.palette.gray[2],

        ...theme.media(1500).max({
            width: width.desktopSm.center,
        }),
    },
    aside: {
        width: '100% !important',
    },
    img: {
        height: theme.rem(8),
        width: theme.rem(8),
        marginBottom: theme.rem(2),
    },
}));

interface IProps {
    aside?: boolean;
    height?: number;
}

const ChatEmpty = ({ height, aside = false }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <div className={clsx(css.empty, aside && css.aside)} style={{ height: `${height}rem` }}>
            <img className={css.img} src="/emoji/empty.png" alt="" />
            <p>У вас пока нету сообщений. Напишите ваше первое сообщение</p>
        </div>
    );
};

export default ChatEmpty;
