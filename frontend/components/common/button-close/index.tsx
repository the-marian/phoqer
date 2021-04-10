import clsx from 'clsx';
import React, { MouseEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        position: 'relative',
        display: 'block',
        height: theme.rem(3.5),
        width: theme.rem(3.5),
        margin: '0.5rem 0.5rem 0 auto',
        fontSize: 0,
        borderRadius: theme.radius,
        transition: theme.transitions[0],

        ...theme.media(768).max({
            height: theme.rem(4),
            width: theme.rem(4),
            background: theme.palette.gray[1],
        }),

        '&:hover': {
            background: theme.palette.gray[1],
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            height: '40%',
            width: theme.rem(0.2),
            background: theme.palette.black[0],
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            height: '40%',
            width: theme.rem(0.2),
            background: theme.palette.black[0],
        },
    },
}));

interface IProps {
    type?: 'button' | 'submit';
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonClose = ({ className, onClick, type = 'button' }: IProps): ReactElement => {
    const css = useStyles();
    return <button className={clsx(css.btn, className)} type={type} onClick={onClick} />;
};

export default ButtonClose;
