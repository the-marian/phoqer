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

        ...theme.media(680).max({
            height: theme.rem(30),
        }),
    },
    topWrp: {
        position: 'absolute',
        top: theme.rem(0.5),
        right: 0,
        display: 'flex',
    },
    top: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(4),
        width: theme.rem(4),
        marginRight: theme.rem(0.5),
        background: theme.palette.white,
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        boxShadow: theme.shadow[0],
        color: theme.palette.yellow[0],
        ...template(theme).outline,
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
        margin: theme.rem(1, 0),
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
        flexDirection: 'column',
    },
    actionBtn: {
        display: 'flex',
        alignItems: 'center',
    },
    btn: {
        ...template(theme).btn,
        background: theme.palette.green[0],
        color: theme.palette.trueWhite,

        ...theme.media(500).max({
            padding: theme.rem(1, 4),
            fontSize: theme.rem(1.8),
        }),
    },
    favorite: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: theme.rem(6),
        height: theme.rem(5),
        marginLeft: theme.rem(0.6),
        color: theme.palette.primary[0],
        borderRadius: theme.radius,
        transition: theme.transitions[0],
        fontSize: theme.rem(1.8),

        ...theme.hover({
            background: theme.palette.secondary[0],
        }),

        ...theme.media(500).max({
            fontSize: theme.rem(2),
        }),
    },
    price: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: theme.rem(0, 0, 1, 0),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],
        color: theme.palette.black[0],
        textTransform: 'lowercase',

        '& small': {
            fontWeight: theme.text.weight[2],
            fontSize: theme.rem(1.2),
            color: theme.palette.primary[4],
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
        width: theme.rem(10),

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
        }),
    },
}));

export default useStyles;
