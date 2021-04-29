import React, { ReactElement } from 'react';
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
        background: theme.palette.gray[0],
        color: theme.palette.black[0],
        fontSize: theme.rem(2),
    },
    btn: {
        padding: theme.rem(1, 3),
        marginLeft: theme.rem(2),
        borderRadius: theme.radius,
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,
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
