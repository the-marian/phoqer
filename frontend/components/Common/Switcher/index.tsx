import clsx from 'clsx';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(1.4),
    },
    wrp: {
        position: 'relative',
        display: 'flex',
        marginRight: theme.rem(1),
        background: theme.palette.gray[1],
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],

        '& span': {
            position: 'relative',
            zIndex: 2,
            padding: theme.rem(1, 2),
        },

        '&:hover::before': {
            border: theme.border(0.1, theme.palette.primary[0]),
        },

        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            zIndex: 1,
            transform: 'translateY(-50%)',
            height: '95%',
            width: '50%',
            borderRadius: theme.radius,
            background: theme.palette.white,
            transition: theme.transitions[0],
            boxShadow: theme.shadow[1],
            border: theme.border(0.1, theme.palette.white),
        },
    },
    open: {
        '&::before': {
            left: '50%',
        },
    },
}));

interface IProps {
    onClick: (value: boolean) => void;
    children?: ReactElement | ReactElement[] | string;
}

const Switcher = ({ onClick, children = undefined }: IProps): ReactElement => {
    const css = useStyles();
    const [value, setValue] = useState(false);

    const handleClick = (): void => {
        onClick(!value);
        setValue(!value);
    };

    return (
        <button className={css.flex} onClick={handleClick} type="button">
            <div className={clsx(css.wrp, value && css.open)}>
                <span>Off</span>
                <span>On</span>
            </div>

            {children}
        </button>
    );
};

export default Switcher;
