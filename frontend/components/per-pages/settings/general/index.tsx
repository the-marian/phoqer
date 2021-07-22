import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../utils/theming/theme';
import Banner from '../../../common/banner';
import Avatar from '../avatar';
import GeneralInfoForm from './general-info-form';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: theme.rem(2, 0),

        ...theme.media(960).max({
            justifyContent: 'center',
        }),
    },
    inner: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: 'calc(100% - 25rem)',
        ...theme.media(960).max({
            width: '100%',
        }),
    },
    banner: {
        margin: theme.rem(6, 0),
        padding: theme.rem(16, 8),
        height: 'auto',

        ...theme.media(768).max({
            padding: theme.rem(10, 4),
        }),
    },
}));

const General = (): ReactElement => {
    const css = useStyles();

    return (
        <div className={css.flex}>
            <Avatar />
            <div className={css.inner}>
                <GeneralInfoForm />
                <Banner className={css.banner} />
            </div>
        </div>
    );
};

export default General;
