import { Styles } from 'jss';

import { Theme } from './theme';

interface Template {
    input: Styles;
    outline: Styles;
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
});

export default template;
