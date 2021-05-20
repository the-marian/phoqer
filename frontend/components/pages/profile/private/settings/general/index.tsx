import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import Banner from '../../../../../common/banner';
import Avatar from '../avatar';
import Bio from './bio';
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
    box: {
        width: '100%',
        padding: theme.rem(4, 4, 0),
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[1]),
        ...theme.media(768).max({
            padding: theme.rem(2, 2, 0),
        }),
    },
    banner: {
        margin: theme.rem(6, 0),
        padding: theme.rem(6, 4),
        height: 'auto',
    },
}));

const General = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.flex}>
            <Avatar />
            <div className={css.inner}>
                <div className={css.box}>
                    <GeneralInfoForm />
                    <Bio />
                </div>
                <Banner className={css.banner} animation />
            </div>
        </div>
    );
};

export default General;
