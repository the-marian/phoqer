import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';

import { Theme } from '../../../../../utils/theming/theme';
import TextSkeleton from '../../../../common/loaders/skeletons/text';
import { width } from '../../chat.config';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width.desktopLg.center,
        height: 'calc(100vh - 6.5rem)',
        background: theme.palette.gray[0],
        borderRadius: theme.radius,
        transition: theme.transitions[1],

        '&.appear, &.exit': {
            transform: 'translateY(2rem)',
            opacity: 0,
        },
        '&.appear-done': {
            transform: 'translateY(0)',
            opacity: 1,
        },

        ...theme.media(1300).max({
            width: width.desktopSm.center,
        }),

        ...theme.media(1060).max({
            width: '100%',
        }),
    },
    inner: {
        width: '100%',
        maxWidth: theme.rem(30),
    },
}));

const ChatLoading = (): ReactElement => {
    const css = useStyles();
    return (
        <CSSTransition timeout={300} in appear exit>
            <div className={css.root}>
                <div className={css.inner}>
                    <TextSkeleton amount={3} />
                </div>
            </div>
        </CSSTransition>
    );
};

export default ChatLoading;
