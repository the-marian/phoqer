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
        height: 'calc(100vh - 7rem)',
        width: width.desktopLg.center,
        padding: theme.rem(2),
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        textAlign: 'center',
        color: theme.palette.gray[2],

        '& > p': {
            maxWidth: theme.rem(40),
            margin: '0 auto',
        },

        ...theme.media(1300).max({
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
    height?: number | string;
    small?: boolean;
}

const ChatEmpty = ({ height, aside = false, small = false }: IProps): ReactElement => {
    const css = useStyles();

    return (
        <div
            className={clsx(css.empty, aside && css.aside)}
            style={{ height: typeof height === 'string' ? height : `${height}rem` }}
        >
            {!small && <img className={css.img} src="/icons/empty.png" alt="" />}
            <p>У вас пока нету сообщений. Напишите ваше первое сообщение</p>
        </div>
    );
};

export default ChatEmpty;
