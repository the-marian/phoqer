import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../../assets/theme';
import useMedia from '../../../../../../hooks/media.hook';
import Avatar from '../avatar';
import ResetEmail from './reset-email';
import ResetPassword from './reset-password';

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
        padding: theme.rem(4),
        borderRadius: theme.radius,
        border: theme.border(0.1, theme.palette.gray[1]),

        ...theme.media(768).max({
            padding: theme.rem(2, 2, 4),
        }),

        ...theme.media(960).max({
            width: '100%',
        }),
    },
}));

const Privacy = (): ReactElement => {
    const css = useStyles();
    const media = useMedia(768);

    return (
        <div className={css.flex}>
            {media ? <Avatar /> : null}
            <div className={css.inner}>
                <ResetPassword />
                <ResetEmail />
            </div>
        </div>
    );
};

export default Privacy;
