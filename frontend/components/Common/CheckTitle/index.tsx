import clsx from 'clsx';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'none',
        margin: theme.rem(1, 4, 1, 0),
        '& span': {
            fontSize: theme.rem(1.4),
        },
    },
    label: {
        height: theme.rem(2.5),
        width: theme.rem(2.5),
        display: 'inline-block',
        marginRight: theme.rem(1.5),
        border: theme.border(0.1, theme.palette.blue[0]),
        background: theme.palette.blue[2],
        borderRadius: theme.radius,
    },
    active: {
        position: 'relative',
        background: theme.palette.blue[0],
        '&::before': {
            content: '""',
            position: 'absolute',
            left: theme.rem(0.9),
            top: theme.rem(0.5),
            width: theme.rem(0.5),
            height: theme.rem(1),
            border: 'solid white',
            borderWidth: theme.rem(0, 0.3, 0.3, 0),
            transform: 'rotate(45deg)',
        },
    },
}));

interface Props {
    children: string;
    onChange: (value: boolean) => void;
}

const CheckTitle = ({ children, onChange }: Props): ReactElement => {
    const css = useStyles();
    const [state, setState] = useState(true);

    const handleClick = () => {
        setState(!state);
        onChange(!state);
    };

    return (
        <button type="button" name="checked" className={css.btn} onClick={handleClick}>
            <span className={clsx(css.label, !state || css.active)} />
            <span>{children}</span>
        </button>
    );
};

export default CheckTitle;
