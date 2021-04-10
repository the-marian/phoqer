import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': {
            left: 0,
            transform: 'translateX(-100%)',
        },
        '100%': {
            left: '100%',
            transform: 'translateX(0)',
        },
    },
    wrp: {
        position: 'relative',
        width: '100%',
        height: theme.rem(0.5),
        background: theme.palette.gray[1],
        overflow: 'hidden',
    },
    inner: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '25%',
        height: '100%',
        background: theme.palette.primary[0],
        transition: theme.transitions[0],
        animation: '$loader 1s ease infinite',
    },
}));

interface IProps {
    loading: boolean;
    className?: string;
}

const Progress = ({ className, loading }: IProps): ReactElement | null => {
    const css = useStyles();

    return loading ? (
        <div className={clsx(className, css.wrp)}>
            <div className={css.inner} />
        </div>
    ) : null;
};

export default Progress;
