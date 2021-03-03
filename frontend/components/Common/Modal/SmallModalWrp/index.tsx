import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import { modal } from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    inner: {
        position: 'relative',
        width: theme.rem(40),
        height: 'max-content',
        margin: theme.rem(2, 0),
        padding: theme.rem(2),
        paddingTop: theme.rem(5),
        borderRadius: theme.radius,
        background: theme.palette.white,

        '@media (max-width: 500px)': {
            width: '90%',
        },
    },
    button: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: theme.rem(1.2, 1.8),
        fontSize: theme.rem(1.6),

        '& svg': {
            height: theme.rem(1.2),
            width: theme.rem(1.2),
        },
    },
}));

interface IProps {
    children: JSX.Element[] | JSX.Element;
}

const SmallModalWrp = ({ children }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.inner}>
            <button type="button" className={css.button} onClick={modal.close}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            {children}
        </div>
    );
};

export default SmallModalWrp;
