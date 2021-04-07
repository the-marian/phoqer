import Router from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
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
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100001,
        width: '100%',
        height: theme.rem(0.5),
        background: theme.palette.gray[1],
        overflow: 'height',
    },
    inner: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '25%',
        height: '100%',
        background: theme.palette.primary[0],
        transition: theme.transitions[0],
        animation: '$loader 1.5s ease infinite',
    },
}));

const Progress = (): ReactElement | null => {
    const css = useStyles();
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        const handleStart = (): void => {
            setLoader(true);
        };
        const handleComplete = (): void => {
            setLoader(false);
        };

        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleComplete);

        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleComplete);
        };
    }, []);

    return loader ? (
        <div className={css.wrp}>
            <div className={css.inner} />
        </div>
    ) : null;
};

export default Progress;
