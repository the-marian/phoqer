import clsx from 'clsx';
import React, { MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.rem(3.5),
        fontSize: theme.rem(1.4),
        flexWrap: 'wrap',

        '@media (max-width: 550px)': {
            marginTop: theme.rem(2.5),
        },
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'none',
        margin: theme.rem(1, 4, 1, 0),
        fontSize: theme.rem(1.4),
        color: theme.palette.black[0],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.6),
        },
    },
    label: {
        height: theme.rem(2.5),
        width: theme.rem(2.5),
        display: 'inline-block',
        marginRight: theme.rem(1.5),
        border: theme.border(0.1, theme.palette.primary[0]),
        background: theme.palette.white,
        borderRadius: theme.radius,
    },
    active: {
        position: 'relative',
        background: theme.palette.primary[0],
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

interface State {
    [key: string]: boolean;
}

const Checkbox = (): ReactElement => {
    const css = useStyles();
    const [state, setState] = useState<State>({
        top: false,
        checked: false,
        pledge: false,
    });

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        setState(value => ({
            ...value,
            [event.currentTarget.name]: !value[event.currentTarget.name],
        }));
    };

    return (
        <div className={css.root}>
            <button type="button" name="top" className={css.btn} onClick={handleClick}>
                <span className={clsx(css.label, !state.top || css.active)} />
                <span>Только ТОП объявления</span>
            </button>

            <button type="button" name="checked" className={css.btn} onClick={handleClick}>
                <span className={clsx(css.label, !state.checked || css.active)} />
                <span>Проверенные</span>
            </button>

            <button type="button" name="pledge" className={css.btn} onClick={handleClick}>
                <span className={clsx(css.label, !state.pledge || css.active)} />
                <span>Без залога</span>
            </button>
        </div>
    );
};

export default Checkbox;
