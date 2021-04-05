import Router from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100001,
        width: '100%',
        height: theme.rem(0.5),
        background: theme.palette.gray[1],
    },
    inner: {
        width: 0,
        height: '100%',
        background: theme.palette.primary[0],
        transition: theme.transitions[0],
    },
}));

const Progress = (): ReactElement | null => {
    const css = useStyles();
    const [loader, setLoader] = useState(0);

    useEffect(() => {
        let id: NodeJS.Timeout;

        const handleStart = (): void => {
            id = setInterval(() => {
                setLoader(value => {
                    if (value >= 95) {
                        clearInterval(id);
                        return value;
                    }
                    if (value >= 80) return value + 0.01;
                    return value + 10;
                });
            }, 10);

            setTimeout(() => {
                handleComplete();
            }, 60_000); // 1 minute = 60 000 milliseconds
        };

        const handleComplete = (): void => {
            clearInterval(id);
            setLoader(100);

            setTimeout(() => {
                setLoader(0);
            }, 100);
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
            <div className={css.inner} style={{ width: `${loader}%` }} />
        </div>
    ) : null;
};

export default Progress;
