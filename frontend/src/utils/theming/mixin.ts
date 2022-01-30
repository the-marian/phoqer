import { Styles } from 'jss';

import { Theme } from './theme';

interface Mixin {
    input: Styles;
    outline: Styles;
    btn: Styles;
    cutString: Styles;
    cutStringMultiLine: (linesToShow: number, fontSize?: number, lineHeight?: number) => Styles;
}

const mixin = (theme: Theme): Mixin => ({
    input: {
        display: 'flex',
        alignItems: 'center',
        height: theme.rem(4),
        width: '100%',
        padding: theme.rem(0.5, 1),
        border: theme.border(0.2, 'transparent'),
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        transition: theme.transitions[0],
        boxShadow: theme.palette.shadowBorder,
        background: theme.palette.white,
        color: theme.palette.black[0],

        ...theme.focus({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
        ...theme.hover({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
    },
    outline: {
        border: theme.border(0.2, 'transparent'),
        transition: theme.transitions[0],

        ...theme.focus({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
        ...theme.hover({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(4),
        padding: theme.rem(0, 1),
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
        textAlign: 'center',
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
        border: theme.border(0.2, 'transparent'),
        transition: theme.transitions[0],

        ...theme.focus({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
        ...theme.hover({
            border: theme.border(0.2, theme.palette.primary[0]),
        }),
    },
    cutString: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cutStringMultiLine: (linesToShow, fontSize = 1.4, lineHeight = 1.4) => ({
        // display: 'block',
        display: '-webkit-box',
        fontSize: fontSize + 'rem',
        lineHeight: String(lineHeight),
        height: linesToShow * fontSize * lineHeight + 'rem',
        ['-webkit-line-clamp']: String(linesToShow),
        ['-webkit-box-orient']: 'vertical',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }),
});

export default mixin;
