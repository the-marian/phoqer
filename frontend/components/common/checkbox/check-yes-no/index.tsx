import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';

const useStyles = createUseStyles((theme: Theme) => ({
    flex: {
        display: 'flex',
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'none',
        margin: theme.rem(1, 4, 1, 0),
        '& span': {
            textAlign: 'left',
            fontSize: theme.rem(1.4),
            color: theme.palette.black[0],
        },
    },
    label: {
        display: 'inline-block',
        height: theme.rem(2.2),
        minWidth: theme.rem(2.2),
        marginRight: theme.rem(1.5),
        border: theme.border(0.2, theme.palette.primary[0]),
        background: theme.palette.trueWhite,
        borderRadius: theme.radius,
        color: theme.palette.black[0],
    },
    active: {
        position: 'relative',
        background: theme.palette.primary[0],
        '&::before': {
            content: '""',
            position: 'absolute',
            left: theme.rem(0.7),
            top: theme.rem(0.4),
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

const CheckYesNo = ({ children, value, onChange }: Props): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    const handleClick = () => {
        onChange(!value);
    };

    return (
        <>
            <p>{children}</p>
            <div className={css.flex}>
                <button type="button" name="checked" className={css.btn} onClick={handleClick}>
                    <span className={clsx(css.label, !value || css.active)} />
                    <span>{trans('yes')}</span>
                </button>
                <button type="button" name="checked" className={css.btn} onClick={handleClick}>
                    <span className={clsx(css.label, value || css.active)} />
                    <span>{trans('no')}</span>
                </button>
            </div>
        </>
    );
};

export default CheckYesNo;
