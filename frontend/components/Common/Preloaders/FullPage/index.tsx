import Router from 'next/router';
import React, { ReactElement, useState } from 'react';
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
        zIndex: 1000,
    },
    img: {
        height: theme.rem(4),
        width: theme.rem(4),
    },
}));

const FullPageLoader = (): ReactElement => {
    const css = useStyles();
    const [loader, setLoader] = useState(false);

    Router.events.on('routeChangeStart', () => {
        setLoader(true);
    });

    Router.events.on('routeChangeComplete', () => {
        setLoader(false);
    });
    return (
        loader && (
            <div className={css.wrp}>
                <img className={css.img} src="/spinner.gif" alt="spinner" />
            </div>
        )
    );
};

export default FullPageLoader;
