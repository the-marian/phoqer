import clsx from 'clsx';
import React, { ChangeEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        width: '100%',
    },
    input: {
        ...template(theme).input,
        background: theme.palette.trueWhite,

        '& span': {
            width: '88%',
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',

            '@media (max-width: 900px)': {
                width: '100%',
            },
        },
    },
    errors: {
        border: theme.border(0.1, theme.palette.red[0]),
        borderRadius: theme.radius,

        '&::placeholder': {
            color: theme.palette.red[0],
        },
    },
    errorsText: {
        position: 'absolute',
        bottom: theme.rem(-0.1),
        left: theme.rem(0.1),
        transform: 'translateY(100%)',
        width: '100%',
        color: theme.palette.red[0],
        fontSize: theme.rem(1.2),
    },
}));

interface IProps {
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    className?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    errors?: string;
    errorsPlaceholder?: boolean;
    readOnly?: boolean;
    autoComplete?: string;
}

const Input = ({
    value,
    onChange,
    className,
    id,
    name,
    type,
    errors,
    autoComplete,
    placeholder = '',
    errorsPlaceholder = false,
    readOnly = false,
}: IProps): ReactElement => {
    const css = useStyles();
    return (
        <div className={css.wrp}>
            <input
                id={id}
                value={value}
                onChange={onChange}
                className={clsx(css.input, className, errors && css.errors)}
                placeholder={errorsPlaceholder ? errors || placeholder : placeholder}
                name={name}
                type={type}
                readOnly={readOnly}
                autoComplete={autoComplete}
            />
            {errors && !errorsPlaceholder && <small className={css.errorsText}>{errors}</small>}
        </div>
    );
};

export default Input;
