import { createUseStyles } from 'react-jss';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    link: {
        flexGrow: 2,
        cursor: 'pointer',
        color: theme.palette.black[0],
        '&:hover h3': {
            textDecoration: 'underline',
        },
    },
    imgWrp: {
        position: 'relative',
    },
    img: {
        height: theme.rem(20),
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
        background: theme.palette.gray[1],
        ...template(theme).outline,

        ...theme.media(580).max({
            height: theme.rem(30),
        }),
    },
    topWrp: {
        position: 'absolute',
        top: theme.rem(1),
        right: theme.rem(1),
        display: 'flex',
    },
    top: {
        margin: theme.rem(0, 0.5),
        padding: theme.rem(0.5, 0.8),
        background: theme.palette.white,
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        boxShadow: theme.shadow[0],
        color: theme.palette.yellow[0],
    },
    delivery: {
        color: theme.palette.primary[0],
    },
    title: {
        margin: theme.rem(1, 0),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        ...theme.media(500).max({
            fontSize: theme.rem(1.8),
        }),
    },
    desc: {
        margin: 0,
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],

        ...theme.media(500).max({
            fontSize: theme.rem(1.6),
        }),
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: theme.rem(2, 0),
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        color: theme.palette.gray[3],
        fontWeight: theme.text.weight[2],
        fontSize: theme.rem(1.4),
    },
    view: {
        paddingLeft: theme.rem(1),
    },
    action: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionBtn: {
        display: 'flex',
        alignItems: 'center',
    },
    btn: {
        ...template(theme).btn,
        height: theme.rem(5),
        background: theme.palette.gray[1],
        color: theme.palette.black[0],

        ...theme.media(500).max({
            padding: theme.rem(1, 4),
            fontSize: theme.rem(1.8),
        }),
    },
    favorite: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: theme.rem(5),
        height: theme.rem(5),
        marginLeft: theme.rem(0.6),
        color: theme.palette.primary[0],
        borderRadius: theme.radius,
        transition: theme.transitions[0],
        fontSize: theme.rem(1.8),

        ...theme.hover({
            background: theme.palette.gray[0],
        }),

        ...theme.media(500).max({
            fontSize: theme.rem(2),
        }),
    },
    active: {
        background: theme.palette.gray[1],
    },
    price: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],
        color: theme.palette.black[0],
        textTransform: 'lowercase',
        textAlign: 'right',

        '& small': {
            fontWeight: theme.text.weight[2],
            fontSize: theme.rem(1.2),
            color: theme.palette.gray[3],
        },

        ...theme.media(500).max({
            fontSize: theme.rem(1.8),

            '& small': {
                fontSize: theme.rem(1.4),
            },
        }),
    },
    dropdown: {
        position: 'absolute',
        top: theme.rem(0.5),
        left: theme.rem(0.5),
        '& > p': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: theme.rem(4),
            padding: theme.rem(0),
            fontSize: theme.rem(2),
            textAlign: 'center',
            background: theme.palette.white,
        },
        ...theme.media(500).max({
            top: theme.rem(1),
            left: theme.rem(1),
            '& > p': {
                width: theme.rem(6),
                fontSize: theme.rem(3),
            },
        }),
    },
}));

export default useStyles;
