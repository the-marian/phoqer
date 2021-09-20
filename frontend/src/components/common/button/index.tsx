import React, { MouseEvent, ReactElement } from 'react';

import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../utils/theming/theme';
import Spinner from '../loaders/spinner';

const useStyles = createUseStyles((theme: Theme) => ({
    '@keyframes loader': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0.5 },
    },
    loading: {
        pointerEvents: 'none',
        animation: '$loader 1.5s ease infinite',

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
    primary: {
        background: theme.palette.primary[0],

        ...theme.hover({
            background: theme.palette.primary[1],
        }),
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
    },
}));

interface IProps {
    loading?: boolean;
    type?: 'button' | 'submit';
    className?: string;
    primary?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactElement | ReactElement[] | string | number;
}

const Button = ({ className, children, primary = false, loading = false, onClick, type = 'button' }: IProps): ReactElement => {
    const css = useStyles();
    return (
        <button
            className={clsx(css.btn, primary && css.primary, className, loading && css.loading)}
            type={type}
            onClick={onClick}
        >
            {loading ? <Spinner className={css.spinner} /> : null}
            <span>{children}</span>
        </button>
    );
};

export default Button;
