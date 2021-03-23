import { Styles } from 'jss';

import { Theme } from './theme';

interface Template {
    input: Styles;
    outline: Styles;
    btn: Styles;
}

const template = (theme: Theme): Template => ({
    input: {
        display: 'block',
        alignItems: 'center',
        height: theme.rem(6),
        width: '100%',
        padding: theme.rem(1, 2),
        border: theme.border(0.1, 'transparent'),
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        transition: theme.transitions[0],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.6),
        },

        '&:focus': {
            border: theme.border(0.1, theme.palette.primary[0]),
        },
        '&:hover': {
            border: theme.border(0.1, theme.palette.primary[0]),
        },
    },
    outline: {
        border: theme.border(0.1, 'transparent'),
        transition: theme.transitions[0],

        '&:focus': {
            border: theme.border(0.1, theme.palette.primary[0]),
        },
        '&:hover': {
            border: theme.border(0.1, theme.palette.primary[0]),
        },
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(6),
        padding: theme.rem(1, 2),
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        textAlign: 'center',
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
        border: theme.border(0.1, 'transparent'),
        transition: theme.transitions[0],

        '&:focus': {
            border: theme.border(0.1, theme.palette.primary[0]),
        },
        '&:hover': {
            border: theme.border(0.1, theme.palette.primary[0]),
        },
    },
});

export default template;
