import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../utils/theming/theme';
import TextSkeleton from '../../../../common/loaders/skeletons/text';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'calc(100vh - 6.5rem)',
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
    },
    inner: {
        width: '100%',
        maxWidth: theme.rem(30),
    },
}));

const ChatLoading = (): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.root}>
            <div className={css.inner}>
                <TextSkeleton amount={3} />
            </div>
        </div>
    );
};

export default ChatLoading;
