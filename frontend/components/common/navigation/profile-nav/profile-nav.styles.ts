import { Styles } from 'jss';

import template from '../../../../utils/theming/template';
import { Theme } from '../../../../utils/theming/theme';

interface INav {
    nav: Styles;
    active: Styles;
}

export const nav = (theme: Theme): INav => ({
    nav: {
        maxWidth: '100vw',
        margin: theme.rem(0, -0.5),

        '& ul': {
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
        },
    },
    active: {
        color: theme.palette.trueWhite,
        background: theme.palette.primary[0],
        pointerEvents: 'none',
    },
});

export const item = (theme: Theme): Styles => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.rem(4),
    minWidth: theme.rem(6),
    margin: theme.rem(0.5),
    padding: theme.rem(0.5, 1),
    color: theme.palette.black[0],
    fontSize: theme.rem(1.4),
    transition: theme.transitions[0],
    borderRadius: theme.radius,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
    boxShadow: theme.palette.shadowBorder,
    ...template(theme).outline,

    '& > span': {
        marginLeft: theme.rem(0.5),
    },
});
