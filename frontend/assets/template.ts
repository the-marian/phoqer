import { Theme } from './theme';

interface CSS {
    [key: string]: string | number | CSS;
}
interface Template {
    input: CSS;
    outline: CSS;
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
});

export default template;
