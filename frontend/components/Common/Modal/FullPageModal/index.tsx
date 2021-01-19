import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import { modal } from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    inner: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: theme.palette.black[0],

        '@media (max-width: 500px)': {
            width: '90%',
        },
        cursor: 'zoom-out',
    },
    button: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: theme.rem(1.2, 1.8),
        fontSize: theme.rem(1.6),
        color: theme.palette.white,

        '& svg': {
            height: theme.rem(1.6),
            width: theme.rem(1.6),
            fill: theme.palette.white,
        },
    },
}));

interface IProps {
    children: JSX.Element[] | JSX.Element;
}

const FullPageModal = ({ children }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.inner} onClick={modal.close} aria-hidden>
            <button type="button" className={css.button}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            {children}
        </div>
    );
};

export default FullPageModal;
