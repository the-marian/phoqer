import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../utils/theming/theme';
import ButtonClose from '../../button-close';
import Logo from '../../logo';
import { modal } from '../index';

const useStyles = createUseStyles((theme: Theme) => ({
    inner: {
        position: 'relative',
        width: '90%',
        maxWidth: theme.rem(100),
        height: 'max-content',
        margin: theme.rem(8, 0),
        padding: theme.rem(5, 1, 1),
        borderRadius: theme.radius,
        background: theme.palette.white,
        color: theme.palette.black[0],
        border: theme.border(0.1, theme.palette.gray[1]),

        ...theme.media(100).max({
            padding: theme.rem(4, 1, 1),
        }),
    },
    button: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    logo: {
        position: 'absolute',
        top: theme.rem(0.2),
        left: theme.rem(1),
    },
}));

interface IProps {
    children: JSX.Element[] | JSX.Element;
}

const MidModalWrp = ({ children }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.inner}>
            <Logo className={css.logo} />
            <ButtonClose className={css.button} onClick={modal.close} />
            {children}
        </div>
    );
};

export default MidModalWrp;
