import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import ResetEmail from './reset-email';
import ResetPassword from './reset-password';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        margin: theme.rem(8, 0, 2),
    },
}));

const Privacy = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.flex}>
            <ResetPassword />
            <ResetEmail />
        </div>
    );
};

export default Privacy;
