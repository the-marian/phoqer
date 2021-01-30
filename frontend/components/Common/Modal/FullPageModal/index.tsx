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
        cursor: 'zoom-out',
    },
}));

interface IProps {
    children: JSX.Element[] | JSX.Element;
}

const FullPageModal = ({ children }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.inner} onClick={modal.close} aria-hidden>
            {children}
        </div>
    );
};

export default FullPageModal;
