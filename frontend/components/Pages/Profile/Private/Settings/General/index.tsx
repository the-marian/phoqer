import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import Avatar from './Avatar';
import GeneralInfoForm from './GeneralInfoForm';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: theme.rem(6, 0, 4),
        flexWrap: 'wrap',
    },
}));

const General = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.flex}>
            <Avatar />
            <GeneralInfoForm />
        </div>
    );
};

export default General;
