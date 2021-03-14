import React, { ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../../assets/theme';
import UserNavLinks from '../../../../Common/NavTabs/UserNavLinks';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        position: 'fixed',
        top: theme.rem(10),
        left: '50%',
        transform: 'translateX(30rem)',
        zIndex: 10001,
        minWidth: theme.rem(35),
        padding: theme.rem(2, 4),
        background: theme.palette.white,
        borderRadius: theme.radius,

        '@media (max-width: 1300px)': {
            top: theme.rem(10),
            right: '5%',
            left: 'unset',
            transform: 'unset',
        },

        '@media (max-width: 1100px)': {
            top: theme.rem(10),
            right: '5%',
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
    const body = document.querySelector('body');

    useEffect(() => {
        const handleClose = (event: KeyboardEvent): void => {
            if (event.code !== 'Escape') return;
            onClose();
        };
        window.addEventListener('keydown', handleClose);

        return () => {
            window.removeEventListener('keydown', handleClose);
        };
    }, []);

    return (
        <>
            {body
                ? ReactDOM.createPortal(
                      <>
                          <div className={css.wrp} onClick={onClose} aria-hidden="true" />
                          <UserNavLinks className={css.root} />
                      </>,
                      body,
                  )
                : null}
        </>
    );
};

export default DropWindow;
