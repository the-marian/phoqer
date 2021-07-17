import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.rem(1.4),
        color: theme.palette.black[0],
        textAlign: 'left',
    },
    wrp: {
        position: 'relative',
        display: 'flex',
        marginRight: theme.rem(1),
        background: theme.palette.gray[1],
        borderRadius: theme.radius,
        textTransform: 'capitalize',

        '& span': {
            position: 'relative',
            zIndex: 2,
            padding: theme.rem(1, 2),
        },

        '&:hover::before': {
            border: theme.border(0.2, theme.palette.primary[1]),
        },

        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: theme.rem(0.35),
            zIndex: 1,
            transform: 'translateY(-50%)',
            height: '85%',
            width: '50%',
            borderRadius: theme.rem(0.7),
            background: theme.palette.white,
            transition: theme.transitions[0],
            boxShadow: theme.shadow[1],
        },
    },
    open: {
        '&::before': {
            left: 'calc(50% - 0.35rem)',
        },
    },
}));

interface IProps {
    on?: string;
    off?: string;
    value?: boolean;
    onClick: (value: boolean) => void;
    children?: ReactElement | ReactElement[] | string;
}

const Switcher = ({ onClick, children = undefined, value = false, on = 'on', off = 'off' }: IProps): ReactElement => {
    const css = useStyles();

    const handleClick = (): void => {
        onClick(!value);
    };

    return (
        <button className={css.flex} onClick={handleClick} type="button">
            <div className={clsx(css.wrp, value && css.open)}>
                <span>{off}</span>
                <span>{on}</span>
            </div>

            {children}
        </button>
    );
};

export default Switcher;
