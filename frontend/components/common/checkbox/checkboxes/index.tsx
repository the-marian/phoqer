import clsx from 'clsx';
import React, { MouseEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
import { ICheckboxes } from '../../../../interfaces';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.rem(3.5),
        fontSize: theme.rem(1.4),
        flexWrap: 'wrap',

        ...theme.media(550).max({
            marginTop: theme.rem(2.5),
        }),
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 'none',
        margin: theme.rem(1, 4, 1, 0),
        fontSize: theme.rem(1.4),
        color: theme.palette.black[0],

        ...theme.media(500).max({
            width: '100%',
            fontSize: theme.rem(1.6),
        }),
    },
    label: {
        display: 'inline-block',
        height: theme.rem(2.2),
        width: theme.rem(2.2),
        marginRight: theme.rem(1.5),
        border: theme.border(0.2, theme.palette.primary[0]),
        background: theme.palette.white,
        borderRadius: theme.rem(0.4),
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

type Entries = [string, boolean | null];

interface IProps {
    className?: string;
    values: ICheckboxes;
    labels: string[];
    onChange: (values: ICheckboxes) => void;
}

const Checkboxes = ({ className, values, labels, onChange }: IProps): ReactElement => {
    const css = useStyles();

    const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        onChange({
            ...values,
            [event.currentTarget.name]: !values[event.currentTarget.name] || null,
        });
    };

    return (
        <div className={clsx(className, css.root)}>
            {Object.entries(values).map((item: Entries, index) => (
                <button key={item[0]} type="button" name={item[0]} className={css.btn} onClick={handleClick}>
                    <span className={clsx(css.label, !item[1] || css.active)} />
                    <span>{labels[index]}</span>
                </button>
            ))}
        </div>
    );
};

export default Checkboxes;
