import { Styles } from 'jss';

import { Theme } from '../../../../../utils/theming/theme';

const notificationsStyles = (theme: Theme): Styles => ({
    root: {
        padding: theme.rem(2),
        borderRadius: theme.radius,
        background: theme.palette.gray[0],
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& button': {
            color: theme.palette.black[0],

            ...theme.hover({
                color: theme.palette.red[0],
            }),
        },
    },
    isNew: {
        background: theme.palette.secondary[0],
    },
    user: {
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        marginLeft: theme.rem(1),
        fontSize: theme.rem(1.2),
        color: theme.palette.gray[4],
        fontWeight: theme.text.weight[3],
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
    date: {
        fontWeight: theme.text.weight[2],
    },
    text: {
        position: 'relative',
        margin: theme.rem(1, 0, 0, 1),
        paddingLeft: theme.rem(1.5),
        fontSize: theme.rem(1.4),
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: theme.rem(0.4),
            background: theme.palette.gray[2],
            opacity: 0.4,
        },
    },
    isNewText: {
        '&::before': {
            background: theme.palette.primary[0],
        },
    },
    link: {
        fontWeight: theme.text.weight[3],
        color: theme.palette.gray[4],
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
    footer: {
        display: 'flex',
        margin: theme.rem(1, 0, 0, 1),
    },
    btn: {
        marginRight: theme.rem(2),
        fontSize: theme.rem(1.3),
        fontWeight: theme.text.weight[3],
        color: theme.palette.primary[0],
        ...theme.hover({
            textDecoration: 'underline',
        }),
    },
});

export default notificationsStyles;
