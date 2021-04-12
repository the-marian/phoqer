import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';
import useConfig from '../../../hooks/config.hook';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: theme.rem(1),
        background: theme.palette.yellow[0],
        color: theme.palette.trueBlack,
        fontSize: theme.rem(2),
    },
    btn: {
        padding: theme.rem(1, 3),
        marginLeft: theme.rem(2),
        borderRadius: theme.radius,
        background: theme.palette.trueWhite,
        color: theme.palette.trueBlack,
    },
}));

const Warning = (): ReactElement | null => {
    const css = useStyles();
    const [config, setConfig] = useConfig();

    const handleClick = (): void => {
        setConfig({ ...config, warning: false });
    };

    return config.warning ? (
        <div className={css.root}>
            <span>The website is under construction. Coming soon...</span>
            <button className={css.btn} type="button" onClick={handleClick}>
                Ok
            </button>
        </div>
    ) : null;
};

export default Warning;
