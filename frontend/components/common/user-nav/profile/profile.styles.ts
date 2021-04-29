import { Styles } from 'jss';

import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';

interface INav {
    nav: Styles;
    active: Styles;
    item: Styles;
}

const nav = (theme: Theme): INav => ({
    nav: {
        maxWidth: '100vw',
        margin: theme.rem(0, -0.5),

        '& ul': {
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            marginBottom: theme.rem(0.6),
        },
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.rem(5),
        minWidth: theme.rem(6),
        margin: theme.rem(0.5),
        padding: theme.rem(0.5, 1),
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
        fontSize: theme.rem(1.4),
        transition: theme.transitions[0],
        borderRadius: theme.radius,
        whiteSpace: 'nowrap',
        textTransform: 'capitalize',
        ...template(theme).outline,

        '& > span': {
            marginLeft: theme.rem(0.5),
        },
    },
    active: {
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
        pointerEvents: 'none',
    },
});

export default nav;
