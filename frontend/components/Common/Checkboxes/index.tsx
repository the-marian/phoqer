import clsx from 'clsx';
import React, { MouseEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../assets/theme';

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

interface IState {
    [key: string]: boolean;
}

type Entries = [string, boolean];

interface IProps {
    values: IState;
    labels: string[];
    onChange: (values: { [key: string]: boolean }) => void;
}

const Checkboxes = ({ values, labels, onChange }: IProps): ReactElement => {
    const css = useStyles();

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        onChange({
            ...values,
            [event.currentTarget.name]: !values[event.currentTarget.name],
        });
    };

    return (
        <div className={css.root}>
            {Object.entries(values).map(
                (item: Entries, index): ReactElement => (
                    <button key={item[0]} type="button" name={item[0]} className={css.btn} onClick={handleClick}>
                        <span className={clsx(css.label, !item[1] || css.active)} />
                        <span>{labels[index]}</span>
                    </button>
                ),
            )}
        </div>
    );
};

export default Checkboxes;
