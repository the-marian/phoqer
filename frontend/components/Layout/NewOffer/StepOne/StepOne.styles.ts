import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    form: {
        padding: theme.rem(3, 10),
        borderRadius: theme.radius,
        background: theme.palette.soft[0],
        maxWidth: theme.rem(80),
        margin: '0 auto',
        color: theme.palette.black[0],

        '& > p': {
            marginTop: theme.rem(4),
            fontSize: theme.rem(1.4),
        },

        '@media (max-width: 580px)': {
            padding: theme.rem(3),
        },
    },
    red: {
        color: theme.palette.red[0],
    },
    inner: {
        margin: theme.rem(3, 0),
    },
    title: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
    },
    icon: {
        fontSize: theme.rem(0.91),
        marginRight: theme.rem(1.5),
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',

        '& > div': {
            flexBasis: '48%',
        },

        '@media (max-width: 500px)': {
            display: 'block',
        },
    },
    saveWrp: {
        display: 'flex',
        margin: theme.rem(2, 0),

        '@media (max-width: 470px)': {
            flexDirection: 'column',
        },
    },
    save: {
        height: theme.rem(6),
        padding: theme.rem(1, 2),
        background: theme.palette.trueWhite,
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],

        '& svg': {
            width: theme.rem(1.6),
            height: theme.rem(1.6),
            marginRight: theme.rem(1),
        },

        '@media (max-width: 470px)': {
            padding: theme.rem(1.6, 2),
        },
    },
    btnWrp: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.rem(6, 0, 4),

        '@media (max-width: 470px)': {
            flexDirection: 'column',
        },
    },
    next: {
        height: theme.rem(6),
        padding: theme.rem(1, 4),
        marginLeft: theme.rem(2),
        background: theme.palette.primary[0],
        fontSize: theme.rem(1.4),
        color: theme.palette.trueWhite,
        borderRadius: theme.radius,

        '@media (max-width: 470px)': {
            margin: theme.rem(2, 0, 0),
            padding: theme.rem(2, 4),
        },
    },
    btn: {
        height: theme.rem(6),
        padding: theme.rem(1, 2),
        marginLeft: theme.rem(2),
        background: theme.palette.trueWhite,
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],

        '& svg': {
            width: theme.rem(1.6),
            height: theme.rem(1.6),
            marginRight: theme.rem(1),
        },

        '@media (max-width: 470px)': {
            margin: theme.rem(1.6, 0, 0),
            padding: theme.rem(1.6, 2),
        },
    },
    errors: {
        border: theme.border(0.1, theme.palette.red[0]),
        borderRadius: theme.radius,
    },
    errorsText: {
        marginTop: theme.rem(1),
        color: theme.palette.red[0],
        fontSize: theme.rem(1.2),
    },
}));

export default useStyles;
