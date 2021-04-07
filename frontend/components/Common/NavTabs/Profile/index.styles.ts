import { Styles } from 'jss';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';

interface INav {
    wrp: Styles;
    black: Styles;
    nav: Styles;
    active: Styles;
}
export const nav = (theme: Theme): INav => ({
    wrp: {
        position: 'relative',
        margin: theme.rem(0, -2),

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: theme.rem(-0.1),
            height: '100%',
            width: theme.rem(3),
            background: 'linear-gradient(90deg,rgba(255,255,255,0) 0%,#fff 100%)',
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: theme.rem(-0.1),
            height: '100%',
            width: theme.rem(2),
            background: 'linear-gradient(-90deg,rgba(255,255,255,0) 0%,#fff 100%)',
        },
    },
    black: {
        '&::before': {
            background: 'linear-gradient(90deg,rgba(34,34,34,0) 0%,#222 100%)',
        },
        '&::after': {
            background: 'linear-gradient(-90deg,rgba(34,34,34,0) 0%,#222 100%)',
        },
    },
    nav: {
        maxWidth: '100vw',
        overflow: 'auto',

        '& ul': {
            display: 'flex',
            justifyContent: 'flex-start',
            width: 'max-content',
            marginBottom: theme.rem(1.6),
        },

        '& li:nth-of-type(1)': {
            marginLeft: theme.rem(1),
        },
        '& li:nth-last-of-type(1)': {
            marginRight: theme.rem(1),
        },
    },
    active: {
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
        pointerEvents: 'none',

        ...theme.media(560).max({
            background: theme.palette.primary[0],
        }),
    },
});

export const item = (theme: Theme): Styles => ({
    display: 'flex',
    alignItems: 'center',
    height: theme.rem(4.5),
    margin: theme.rem(0, 1),
    padding: theme.rem(0.5, 1.8),
    background: theme.palette.gray[0],
    color: theme.palette.black[0],
    fontSize: theme.rem(1.4),
    transition: theme.transitions[0],
    borderRadius: theme.radius,
    whiteSpace: 'nowrap',
    ...template(theme).outline,

    ...theme.media(768).max({
        margin: theme.rem(0, 0.4),
    }),

    ...theme.media(560).max({
        background: theme.palette.gray[1],
    }),
});

export const itemSvg = (theme: Theme): Styles => ({
    ...item(theme),

    ...theme.media(560).max({
        background: theme.palette.gray[1],
        fontSize: '0',
    }),

    '& svg': {
        marginRight: theme.rem(1),

        ...theme.media(560).max({
            height: theme.rem(1.8),
            width: theme.rem(1.8),
            margin: '0',
        }),
    },
});
