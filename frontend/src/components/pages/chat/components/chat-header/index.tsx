import React from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';

import { ChatTypeEnum } from '../../../../../interfaces';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    header: {
        height: theme.rem(5),
        paddingTop: theme.rem(1),
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: theme.rem(0, 1.5),
    },
    button: {
        ...mixin(theme).btn,

        height: '100%',
        flexGrow: 2,
        margin: theme.rem(0, 0.5),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[5],
    },
    active: {
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
    },
}));

export const ChatHeader = (): JSX.Element => {
    const css = useStyles();

    const history = useRouter();
    const type = String(history.query.type);
    const chatId = String(history.query.chat);

    return (
        <div className={css.header}>
            <div className={css.container}>
                <button className={clsx(css.button, css.active)} type="button">
                    Я арендую
                </button>
                <button className={css.button} type="button">
                    Я сдаю в аренду
                </button>
            </div>
        </div>
    );
};
