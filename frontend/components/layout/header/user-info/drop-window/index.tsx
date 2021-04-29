import React, { ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../assets/theme';
import UserNavDropdown from '../../../../common/user-nav/user-nav-dropdown';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        top: theme.rem(7),
        right: '15%',
        zIndex: 10001,
        minWidth: theme.rem(30),
        padding: theme.rem(2, 4),
        background: theme.palette.white,
        borderRadius: theme.radius,
        transition: theme.transitions[0],
        border: theme.border(0.1, theme.palette.gray[1]),

        ...theme.media(500).max({
            top: theme.rem(6),
            right: '5%',
        }),
        '&.appear': {
            transform: 'translateY(-5rem)',
            opacity: 0,
        },
        '&.appear-done': {
            transform: 'translateY(0)',
            opacity: 1,
        },
    },
    wrp: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.palette.modal,
        zIndex: 10000,
    },
}));

interface Props {
    onClose: () => void;
}

const DropWindow = ({ onClose }: Props): ReactElement => {
    const css = useStyles();

    useEffect(() => {
        const handleClose = (event: KeyboardEvent): void => {
            if (event.code !== 'Escape') return;
            onClose();
        };
        window.addEventListener('keydown', handleClose);

        return () => window.removeEventListener('keydown', handleClose);
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className={css.wrp} onClick={onClose} aria-hidden="true" />
            <UserNavDropdown className={css.root} />
        </>,
        document.body,
    );
};

export default DropWindow;
