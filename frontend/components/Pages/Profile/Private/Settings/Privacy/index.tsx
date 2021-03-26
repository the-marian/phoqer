import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import ResetEmail from './ResetEmail';
import ResetPassword from './ResetPassword';

const useStyles = createUseStyles((theme: Theme) => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: theme.fr(3),
        gridGap: theme.rem(3),
        margin: theme.rem(6, 0, 4),

        '@media (max-width: 1200px)': {
            gridTemplateColumns: theme.fr(2),
        },

        '@media (max-width: 680px)': {
            gridTemplateColumns: theme.fr(1),
        },
    },
}));

const Privacy = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.grid}>
            <ResetPassword />
            <ResetEmail />
        </div>
    );
};

export default Privacy;
