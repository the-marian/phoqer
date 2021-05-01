import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import ButtonClose from '../../button-close';
import { modal } from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        background: theme.palette.trueBlack,
    },
    inner: {
        maxHeight: 'calc(100vh - 5rem)',
        flexGrow: 2,
    },
    button: {
        position: 'absolute',
        top: theme.rem(1),
        right: theme.rem(1),
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        height: theme.rem(4.5),
        minHeight: theme.rem(4.5),
        width: theme.rem(4.5),
        background: theme.palette.gray[4],

        '&::after': {
            background: theme.palette.white,
        },
        '&::before': {
            background: theme.palette.white,
        },

        ...theme.media(768).max({
            top: theme.rem(6),
        }),
    },
    mobile: {
        top: theme.rem(6),
    },
}));

interface IProps {
    children: JSX.Element[] | JSX.Element;
}

const toMatch = /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;

const FullPageModal = ({ children }: IProps): ReactElement => {
    const css = useStyles();
    const isMobile = toMatch.test(window.navigator.userAgent || '');

    return (
        <div className={css.wrp}>
            <ButtonClose className={clsx(css.button, isMobile && css.mobile)} onClick={modal.close} />
            <div className={css.inner}>{children}</div>
        </div>
    );
};

export default FullPageModal;
