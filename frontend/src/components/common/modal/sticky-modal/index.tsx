import React, { ReactElement, useEffect } from 'react';

import { createUseStyles } from 'react-jss';

import useMedia from '../../../../hooks/media.hook';
import { Theme } from '../../../../utils/theming/theme';
import ButtonClose from '../../button-close';
import Logo from '../../logo';
import { modal } from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        width: '100%',
        maxWidth: '40rem',
        borderRadius: '1rem',
        background: theme.palette.white,

        ...theme.media(768).max({
            minHeight: '50vh',
            maxWidth: 'unset',
            borderRadius: '1rem 1rem 0 0',
        }),
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.rem(0.5, 1),

        ...theme.media(768).max({
            position: 'relative',
            cursor: 'grab',
            userSelect: 'none',
        }),
    },

    btn: {
        margin: '0',
    },

    inner: {
        position: 'relative',
        width: theme.rem(40),
        height: 'max-content',
        maxHeight: '80vh',
        padding: theme.rem(1),
        borderRadius: theme.radius,
        background: theme.palette.white,
        color: theme.palette.black[0],
        border: theme.border(0.1, theme.palette.gray[1]),
        overflow: 'auto',

        ...theme.media(768).max({
            width: '100%',
        }),
    },
}));

interface IProps {
    children: ReactElement[] | ReactElement | string;
}

const StickyModal = ({ children }: IProps): ReactElement => {
    const css = useStyles();
    const media = useMedia(768);

    useEffect(() => {
        const backdrop = document.getElementById('backdrop');
        if (backdrop) backdrop.style.alignItems = media ? 'center' : 'flex-end';
    }, [media]);

    return (
        <div className={css.root}>
            <header className={css.header}>
                <Logo />
                <ButtonClose className={css.btn} onClick={modal.close} />
            </header>
            <div className={css.inner}>{children}</div>
        </div>
    );
};

export default StickyModal;
