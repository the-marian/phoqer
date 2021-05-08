import { Styles } from 'jss';

import { Theme } from './theme';

interface Template {
    input: Styles;
    outline: Styles;
    btn: Styles;
}

const template = (theme: Theme): Template => ({
    input: {
        display: 'flex',
        alignItems: 'center',
        height: theme.rem(5),
        width: '100%',
        padding: theme.rem(0.5, 1),
        border: theme.border(0.2, 'transparent'),
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        transition: theme.transitions[0],
        boxShadow: theme.shadow[1],

        ...theme.focus({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
        ...theme.hover({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
    },
    outline: {
        border: theme.border(0.2, 'transparent'),
        transition: theme.transitions[0],

        ...theme.focus({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
        ...theme.hover({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(5),
        padding: theme.rem(1, 2),
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        textAlign: 'center',
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
        border: theme.border(0.2, 'transparent'),
        transition: theme.transitions[0],

        ...theme.focus({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
        ...theme.hover({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
    },
});

export default template;
