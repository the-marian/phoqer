import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    num: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.rem(2.5),
        maxWidth: theme.rem(2.5),
        minWidth: theme.rem(2.5),
        background: theme.palette.red[0],
        borderRadius: '50%',
        color: theme.palette.trueWhite,
        fontSize: theme.rem(1.2),
        fontWeight: theme.text.weight[2],
    },
}));

interface Props {
    children: string | number;
    className?: string;
}

const NotifNumber = ({ children, className }: Props): ReactElement => {
    const css = useStyles();
    return <div className={clsx(css.num, className)}>{+children < 10 ? children : '+9'}</div>;
};

export default NotifNumber;
