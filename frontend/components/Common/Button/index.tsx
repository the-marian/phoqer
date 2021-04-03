import clsx from 'clsx';
import React, { MouseEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import Spinner from '../Preloaders/Spinner';

const useStyles = createUseStyles({
    loading: {
        pointerEvents: 'none',

        '& span': {
            opacity: 0,
        },
    },
    btn: {
        position: 'relative',
        fontSize: 'inherit',

        '& span': {
            fontSize: 'inherit',
        },
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
    },
});

interface IProps {
    loading?: boolean;
    type?: 'button' | 'submit';
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactElement | ReactElement[] | string | number;
}

const Button = ({ className, children, loading = false, onClick, type = 'button' }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <button className={clsx(css.btn, className, loading && css.loading)} type={type} onClick={onClick}>
            {loading ? <Spinner className={css.spinner} /> : null}
            <span>{children}</span>
        </button>
    );
};

export default Button;
