import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    form: {
        padding: theme.rem(3, 10),
        borderRadius: theme.radius,
        background: theme.palette.soft[2],
        maxWidth: theme.rem(80),
        margin: '0 auto',

        '@media (max-width: 580px)': {
            padding: theme.rem(3),
        },
    },
    title: {
        margin: theme.rem(3, 0, 1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
    },
    btnWrp: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.rem(6, 0, 4),

        '@media (max-width: 470px)': {
            flexDirection: 'column',
        },
    },
    text: {
        fontSize: theme.rem(1.2),
        marginBottom: theme.rem(2),
    },
    next: {
        padding: theme.rem(1, 4),
        marginLeft: theme.rem(2),
        background: theme.palette.primary[0],
        fontSize: theme.rem(1.4),
        color: theme.palette.white,
        borderRadius: theme.radius,

        '@media (max-width: 470px)': {
            margin: theme.rem(2, 0, 0),
            padding: theme.rem(2, 4),
        },
    },
    btn: {
        height: theme.rem(6),
        padding: theme.rem(1, 4),
        marginLeft: theme.rem(2),
        background: theme.palette.white,
        fontSize: theme.rem(1.4),
        color: theme.palette.black,
        borderRadius: theme.radius,

        '@media (max-width: 470px)': {
            margin: theme.rem(1.6, 0, 0),
            padding: theme.rem(1.6, 4),
        },
    },
}));

export default useStyles;
