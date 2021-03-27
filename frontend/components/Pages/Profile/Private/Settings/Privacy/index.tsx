import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import ResetEmail from './ResetEmail';
import ResetPassword from './ResetPassword';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.rem(2, 0),
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
