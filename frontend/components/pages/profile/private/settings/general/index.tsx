import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import Avatar from './avatar';
import Bio from './bio';
import GeneralInfoForm from './general-info-form';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: theme.rem(2, 0),
        flexWrap: 'wrap',
    },
}));

const General = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.flex}>
            <Avatar />
            <GeneralInfoForm />
            <Bio />
        </div>
    );
};

export default General;
