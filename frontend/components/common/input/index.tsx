import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import template from '../../../assets/template';
import { Theme } from '../../../assets/theme';
import useTrans from '../../../hooks/trans.hook';

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
        background: theme.palette.gray[1],
        color: theme.palette.black[0],

        '& span': {
            width: '88%',
            marginLeft: theme.rem(1),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',

            ...theme.media(900).max({
                width: '100%',
            }),
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
    icon: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.rem(5),
        width: theme.rem(5),
        fontSize: theme.rem(1.8),
        color: theme.palette.black[0],
    },
    iconLeft: {
        right: 0,
        left: 0,
    },
    withPassword: {
        paddingRight: theme.rem(4),
    },
    withIcon: {
        paddingLeft: theme.rem(4),
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
    icon?: IconProp;
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
    const trans = useTrans();
    const [show, setShow] = useState<string>(type || 'text');

    const handleClick = (): void => {
        setShow(value => (value === 'password' ? 'text' : 'password'));
    };

    return (
        <div className={css.wrp}>
            <div className={css.inner}>
                {icon ? (
                    <div className={clsx(css.icon, css.iconLeft)}>
                        <FontAwesomeIcon icon={icon} />
                    </div>
                ) : null}
                <input
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={clsx(
                        css.input,
                        className,
                        type === 'password' && css.withPassword,
                        icon && css.withIcon,
                        errors && css.errors,
                    )}
                    placeholder={errorsInPlaceholder ? errors || placeholder : placeholder}
                    name={name}
                    type={show}
                    readOnly={readOnly}
                    autoComplete={autoComplete}
                />
                {type === 'password' ? (
                    <button className={css.icon} onClick={handleClick} type="button">
                        {show === 'password' ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </button>
                ) : null}
            </div>
            {errors && !errorsInPlaceholder && <small className={css.errorsText}>{trans(errors)}</small>}
        </div>
    );
};

export default Input;
