import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { dateFromTimestamp } from '../../../../utils/helpers';
import { Theme } from '../../../../utils/theming/theme';
import Tooltip from '../../tooltip';

const TEN_MINUTES_IN_MS = 600000;

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
    const isOnline = (date && Date.now() - +date < TEN_MINUTES_IN_MS) || online;
    return (
        <Tooltip content={isOnline ? 'online' : 'offline'}>
            <div className={clsx(css.root, isOnline ? css.green : css.gray, className)} />
        </Tooltip>
    );
};

export default OnlineIndicator;
