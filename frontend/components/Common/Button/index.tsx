import clsx from 'clsx';
import React, { MouseEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import Spinner from '../Preloaders/Spinner';

const useStyles = createUseStyles({
    loading: {
        pointerEvents: 'none',
    },
    btn: {
        fontSize: 'inherit',
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
            {loading ? <Spinner /> : children}
        </button>
    );
};

export default Button;
