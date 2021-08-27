import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    num: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.rem(2),
        maxWidth: theme.rem(2),
        minWidth: theme.rem(2),
        background: theme.palette.red[0],
        borderRadius: '50%',
        color: theme.palette.trueWhite,
        fontSize: theme.rem(1.1),
        fontWeight: theme.text.weight[2],
        border: theme.border(0.1, theme.palette.trueWhite),
    },
    long: {
        maxWidth: theme.rem(2.5),
        minWidth: theme.rem(2.5),
        borderRadius: '5rem',
    },
}));

interface Props {
    children: string | number;
    className?: string;
}

const Badge = ({ children, className }: Props): ReactElement => {
    const css = useStyles();
    const long = +children > 10;
    return <span className={clsx(css.num, long && css.long, className)}>{long ? '+9' : children}</span>;
};

export default Badge;
