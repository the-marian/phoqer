import React, { CSSProperties, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    num: {
        position: 'absolute',
        top: theme.rem(-1.4),
        left: theme.rem(-2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.rem(0.1, 0.7),
        background: theme.palette.red[0],
        borderRadius: theme.rem(2),
        color: theme.palette.trueWhite,
        fontSize: theme.rem(1.2),
        fontWeight: theme.text.weight[2],

        '@media (max-width: 768px)': {
            top: theme.rem(-1),
            left: theme.rem(-1.6),
            fontSize: theme.rem(1.8),
            padding: theme.rem(0.2, 0.8),
        },
    },
}));

interface Props {
    children: string;
    style?: CSSProperties;
}

const NotifNumber = ({ children, style }: Props): ReactElement => {
    const css = useStyles();
    return (
        <span className={css.num} style={style}>
            {children}
        </span>
    );
};

export default NotifNumber;
