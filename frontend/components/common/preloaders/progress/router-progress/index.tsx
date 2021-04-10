import Router from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import Progress from '../index';

const useStyles = createUseStyles({
    progress: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100001,
    },
});

const RouterProgress = (): ReactElement => {
    const css = useStyles();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleStart = (): void => {
            setLoading(true);
        };
        const handleComplete = (): void => {
            setLoading(false);
        };

        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleComplete);

        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleComplete);
        };
    }, []);
    return <Progress className={css.progress} loading={loading} />;
};

export default RouterProgress;
