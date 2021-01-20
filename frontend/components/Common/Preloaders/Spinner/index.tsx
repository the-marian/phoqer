import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    wrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: theme.rem(2.5),
        width: theme.rem(2.5),
    },
}));

const Spinner = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.wrap}>
            <img className={css.img} src="/spinner.gif" alt="spinner" />
        </div>
    );
};

export default Spinner;
