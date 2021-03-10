import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import { modal } from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: theme.palette.trueBlack,
    },
    inner: {
        flexGrow: 2,
    },
    button: {
        display: 'block',
        marginLeft: 'auto',
        padding: theme.rem(1.2, 1.8),
        fontSize: theme.rem(1.6),
        color: theme.palette.trueWhite,

        '& svg': {
            height: theme.rem(1.6),
            width: theme.rem(1.6),
        },
    },
}));

interface IProps {
    children: JSX.Element[] | JSX.Element;
}

const FullPageModal = ({ children }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.wrp} aria-hidden>
            <button type="button" className={css.button} onClick={modal.close}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className={css.inner}>{children}</div>
        </div>
    );
};

export default FullPageModal;
