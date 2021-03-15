import { Styles } from 'jss';

import { Theme } from './theme';

interface Template {
    input: Styles;
    outline: Styles;
    profileNav: Styles;
}

const template = (theme: Theme): Template => ({
    input: {
        display: 'block',
        alignItems: 'center',
        height: theme.rem(6),
        width: '100%',
        padding: theme.rem(1, 2),
        border: 'none',
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        transition: theme.transitions[0],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.6),
        },

        '&:focus': {
            boxShadow: '0 0 0 0.1rem' + theme.palette.primary[0],
        },
        '&:hover': {
            boxShadow: '0 0 0 0.1rem' + theme.palette.primary[0],
        },
    },
    outline: {
        transition: theme.transitions[0],

        '&:focus': {
            boxShadow: '0 0 0 0.1rem' + theme.palette.primary[0],
        },
        '&:hover': {
            boxShadow: '0 0 0 0.1rem' + theme.palette.primary[0],
        },
    },
    profileNav: {
        tabs: {
            '& ul': {
                display: 'flex',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                margin: theme.rem(0, -1, 6),
            },

            '& li': {
                flexGrow: 1,

                '@media (max-width: 1300px)': {
                    flexGrow: 'unset',
                },
            },
        },
        item: {
            display: 'flex',
            alignItems: 'center',
            margin: theme.rem(1),
            padding: theme.rem(1.2, 2),
            background: theme.palette.gray[0],
            color: theme.palette.black[0],
            fontSize: theme.rem(1.6),
            transition: theme.transitions[0],
            borderRadius: theme.radius,

            '& svg': {
                marginRight: theme.rem(1),
            },

            '&:hover': {
                background: theme.palette.gray[1],
            },
        },
        active: {
            color: theme.palette.trueWhite,
            background: theme.palette.primary[0],
        },
    },
});

export default template;
