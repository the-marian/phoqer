import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        maxWidth: theme.rem(80),
        margin: '0 auto',
        textAlign: 'center',
        color: theme.palette.black[0],

        '& svg': {
            height: theme.rem(5),
            width: theme.rem(5),

            '& circle': {
                fill: theme.palette.green,
            },
        },
    },
    success: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        maxWidth: theme.rem(40),
        margin: '2rem auto',
        color: theme.palette.green,
    },
    text: {
        maxWidth: theme.rem(40),
        margin: '0 auto',
        fontSize: theme.rem(1.2),
    },
    link: {
        margin: theme.rem(3),
        fontSize: theme.rem(1.2),
        color: theme.palette.primary[0],
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    top: {
        margin: '5rem auto',
        padding: theme.rem(10),
        borderRadius: theme.radius,
        background: theme.palette.soft[0],

        '@media (max-width: 460px)': {
            padding: theme.rem(6, 3),
        },
    },
    btn: {
        height: theme.rem(6),
        padding: theme.rem(1, 4),
        margin: theme.rem(5, 0, 0),
        background: theme.palette.primary[0],
        fontSize: theme.rem(1.4),
        color: theme.palette.trueWhite,
        borderRadius: theme.radius,

        '@media (max-width: 470px)': {
            margin: theme.rem(2, 0, 0),
            padding: theme.rem(2, 4),
        },
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.green[0],
    },
    topTitle: {
        maxWidth: theme.rem(40),
        margin: '3rem auto',
    },
    img: {
        width: theme.rem(10),
        margin: '0 auto',
    },
}));

export default useStyles;
