import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    num: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.rem(1.8),
        maxWidth: theme.rem(1.8),
        minWidth: theme.rem(1.8),
        background: theme.palette.red[0],
        borderRadius: '50%',
        color: theme.palette.trueWhite,
        fontSize: theme.rem(0.9),
        fontWeight: theme.text.weight[2],
    },
}));

interface Props {
    children: string | number;
    className?: string;
}

const NotifNumber = ({ children, className }: Props): ReactElement => {
    const css = useStyles();
    return <span className={clsx(css.num, className)}>{+children < 10 ? children : '+9'}</span>;
};

export default NotifNumber;
