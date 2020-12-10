import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    wrapp: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.rem(4),
    },
    img: {
        height: theme.rem(3),
        width: theme.rem(3),
    },
}));

const Spinner = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.wrapp}>
            <img className={css.img} src="/spinner.gif" alt="spinner" />
        </div>
    );
};

export default Spinner;
