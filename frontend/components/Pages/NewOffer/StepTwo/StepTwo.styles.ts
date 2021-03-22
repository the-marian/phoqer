import { createUseStyles } from 'react-jss';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    form: {
        padding: theme.rem(3, 10),
        borderRadius: theme.radius,
        background: theme.palette.soft[5],
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
    inner: {
        position: 'relative',
        margin: theme.rem(3, 0),
    },
    red: {
        color: theme.palette.red[0],
    },
    title: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
    },
    input: {
        ...template(theme).input,
        background: theme.palette.trueWhite,

        '& span': {
            marginLeft: theme.rem(1.5),
            fontSize: theme.rem(1.3),
        },
    },
    textarea: {
        width: '100%',
        height: theme.rem(10),
        padding: theme.rem(2),
        boxShadow: theme.shadow[1],
    },
    wrp: {
        display: 'grid',
        gridTemplateColumns: theme.fr(3),
        gridGap: theme.rem(1),

        '@media (max-width: 500px)': {
            gridTemplateColumns: theme.fr(1),
        },
    },
    inputWrp: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inactive: {
        pointerEvents: 'none',
        opacity: 0.4,
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

        '@media (max-width: 470px)': {
            margin: theme.rem(1.6, 0, 0),
            padding: theme.rem(1.6, 2),
        },

        '& svg': {
            width: theme.rem(1.6),
            height: theme.rem(1.6),
            marginRight: theme.rem(1),
        },
    },
    errors: {
        border: theme.border(0.1, theme.palette.red[0]),
    },
    errorsText: {
        marginTop: theme.rem(1),
        color: theme.palette.red[0],
        fontSize: theme.rem(1.2),
    },
}));

export default useStyles;
