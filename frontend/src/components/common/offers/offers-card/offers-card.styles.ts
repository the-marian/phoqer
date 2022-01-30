import { createUseStyles } from 'react-jss';

import mixin from '../../../../utils/theming/mixin';
import { Theme } from '../../../../utils/theming/theme';

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

        ...theme.media(768).max({
            background: theme.palette.gray[0],
            borderRadius: theme.radius,
        }),
    },
    tooltip: {
        minWidth: theme.rem(20),
    },
    imgWrp: {
        position: 'relative',
    },
    imgBig: {
        height: theme.rem(20),
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
        background: theme.palette.gray[1],
        ...mixin(theme).outline,

        ...theme.media(680).max({
            height: theme.rem(30),
        }),
    },
    imgSmall: {
        height: theme.rem(11),
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
        background: theme.palette.gray[1],
        ...mixin(theme).outline,
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
        fontSize: theme.rem(1.2),
        boxShadow: theme.shadow[0],
        color: theme.palette.yellow[0],
        cursor: 'default',
    },
    topSmall: {
        height: theme.rem(3),
        width: theme.rem(3),
        fontSize: theme.rem(1.2),
        borderRadius: theme.rem(0.6),
    },
    delivery: {
        color: theme.palette.primary[0],
    },
    author: {
        color: theme.palette.primary[0],
    },
    titleBig: {
        margin: theme.rem(1, 0, 0),
        fontWeight: theme.text.weight[3],
        ...mixin(theme).cutStringMultiLine(2, 1.5),

        ...theme.media(500).max({
            ...mixin(theme).cutStringMultiLine(2, 1.6),
        }),
    },
    titleSmall: {
        margin: theme.rem(1),
        fontWeight: theme.text.weight[2],

        ...mixin(theme).cutStringMultiLine(2, 1.2),
    },
    desc: {
        margin: theme.rem(1, 0, 1.5),
        fontWeight: theme.text.weight[2],
        ...mixin(theme).cutStringMultiLine(2, 1.2),

        ...theme.media(500).max({
            ...mixin(theme).cutStringMultiLine(2, 1.4),
        }),
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: theme.rem(0.3, 0),
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        color: theme.palette.gray[4],
        fontWeight: theme.text.weight[2],
        fontSize: theme.rem(1.2),
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
        ...mixin(theme).btn,
        background: theme.palette.green[0],
        color: theme.palette.trueWhite,

        ...theme.media(500).max({
            padding: theme.rem(1, 4),
            fontSize: theme.rem(1.6),
        }),
    },
    favorite: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: theme.rem(6),
        height: theme.rem(4),
        marginLeft: theme.rem(0.6),
        color: theme.palette.primary[0],
        borderRadius: theme.radius,
        transition: theme.transitions[0],
        fontSize: theme.rem(1.8),
        background: theme.palette.gray[0],

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
        fontSize: theme.rem(1.4),
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
    priceSmall: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: theme.rem(0.3, 1),
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[4],

        '& small': {
            fontSize: theme.rem(1),
        },
    },
    dropdown: {
        position: 'absolute',
        top: theme.rem(0.5),
        left: theme.rem(0.5),
        width: theme.rem(10),

        '& > button': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: theme.rem(4),
            padding: theme.rem(0),
            fontSize: theme.rem(1.4),
            textAlign: 'center',
            background: theme.palette.white,
        },
    },
    dropdownSmall: {
        '& > button': {
            width: theme.rem(3),
            fontSize: theme.rem(1.4),
            borderRadius: theme.rem(0.7),
        },
    },
    cantRent: {
        padding: theme.rem(1),
        borderRadius: theme.radius,
        background: theme.palette.secondary[0],
        fontSize: theme.rem(1.2),
        color: theme.palette.primary[0],
        fontWeight: theme.text.weight[3],
    },
}));

export default useStyles;
