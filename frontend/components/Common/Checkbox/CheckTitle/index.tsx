import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    btn: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'none',
        margin: theme.rem(1, 4, 1, 0),
        '& span': {
            textAlign: 'left',
            fontSize: theme.rem(1.4),
            color: theme.palette.black[0],

            ...theme.media(768).max({
                fontSize: theme.rem(1.6),
            }),
        },
    },
    label: {
        height: theme.rem(2.2),
        minWidth: theme.rem(2.2),
        display: 'inline-block',
        marginRight: theme.rem(1.5),
        border: theme.border(0.2, theme.palette.primary[0]),
        background: theme.palette.trueWhite,
        borderRadius: theme.radius,
    },
    active: {
        position: 'relative',
        background: theme.palette.primary[0],
        '&::before': {
            content: '""',
            position: 'absolute',
            top: theme.rem(0.4),
            left: theme.rem(0.7),
            width: theme.rem(0.5),
            height: theme.rem(1),
            border: 'solid white',
            borderWidth: theme.rem(0, 0.3, 0.3, 0),
            transform: 'rotate(45deg)',
        },
    },
}));

interface Props {
    children: JSX.Element | string;
    value?: boolean;
    onChange: (value: boolean) => void;
}

const CheckTitle = ({ children, value, onChange }: Props): ReactElement => {
    const css = useStyles();

    const handleClick = () => {
        onChange(!value);
    };

    return (
        <button type="button" name="checked" className={css.btn} onClick={handleClick}>
            <span className={clsx(css.label, !value || css.active)} />
            <span>{children}</span>
        </button>
    );
};

export default CheckTitle;
