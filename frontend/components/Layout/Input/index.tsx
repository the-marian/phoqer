import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    wrp: {
        position: 'relative',
        width: '100%',
    },
    inner: {
        position: 'relative',
        width: '100%',
    },
    input: {
        ...template(theme).input,
        color: theme.palette.black[0],

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
    eye: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.rem(6),
        width: theme.rem(6),
        fontSize: theme.rem(1.8),
        color: theme.palette.black[0],
    },
    password: {
        paddingRight: theme.rem(6),
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
    errorsInPlaceholder?: boolean;
    readOnly?: boolean;
    autoComplete?: string;
    icon?: string;
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
    errorsInPlaceholder = false, // show error text in input placeholder
    readOnly = false,
    icon,
}: IProps): ReactElement => {
    const css = useStyles();
    const [show, setShow] = useState<string>(type || 'text');

    const handleClick = (): void => {
        setShow(value => (value === 'password' ? 'text' : 'password'));
    };

    return (
        <div className={css.wrp}>
            <div className={css.inner}>
                <input
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={clsx(css.input, type === 'password' && css.password, className, errors && css.errors)}
                    placeholder={errorsInPlaceholder ? errors || placeholder : placeholder}
                    name={name}
                    type={show}
                    readOnly={readOnly}
                    autoComplete={autoComplete}
                />
                {type === 'password' ? (
                    <button className={css.eye} onClick={handleClick} type="button">
                        {show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </button>
                ) : null}
            </div>
            {errors && !errorsInPlaceholder && <small className={css.errorsText}>{errors}</small>}
        </div>
    );
};

export default Input;
