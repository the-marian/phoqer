import Router from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.modal,
        zIndex: 10000000000,
    },
    img: {
        height: theme.rem(4),
        width: theme.rem(4),
    },
}));

const FullPageLoader = (): ReactElement => {
    const css = useStyles();
    const [loader, setLoader] = useState(false);

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

    return (
        <>
            {loader ? (
                <div className={css.wrp}>
                    <img className={css.img} src="/spinner.gif" alt="spinner" />
                </div>
            ) : null}
        </>
    );
};

export default FullPageLoader;
