import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { dateFromTimestamp } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';

const FIVE_MINUTES_IN_MS = 300000;

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        height: theme.rem(2),
        width: theme.rem(2),
        borderRadius: '50%',
        border: theme.border(0.2, theme.palette.trueWhite),
    },
    green: {
        background: '#22cc52',
    },
    gray: {
        background: theme.palette.gray[1],
    },
}));

interface IProps {
    time?: string | null;
    online?: boolean;
    className?: string;
}
const OnlineIndicator = ({ className, time, online = false }: IProps): ReactElement => {
    const css = useStyles();
    const date: Date | null = dateFromTimestamp(time);
    const isOnline = (date && Date.now() - +date < FIVE_MINUTES_IN_MS) || online;
    return <div className={clsx(css.root, isOnline ? css.green : css.gray, className)} />;
};

export default OnlineIndicator;
