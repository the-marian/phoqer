import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { isEmpty, mailRegex } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import { ILogin } from '../../../../interfaces';
import types from '../../../../redux/types';
import GoogleFacebook from '../../GoogleFacebook';
import Input from '../../Input';
import Spinner from '../../Preloaders/Spinner';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[3],
        color: theme.palette.black[0],
        textAlign: 'center',

        '@media (max-width: 500px)': {
            fontSize: theme.rem(2.4),
        },
    },
    wrp: {
        position: 'relative',
        margin: theme.rem(2, 0),
    },
    input: {
        ...template(theme).input,
        padding: theme.rem(0, 5, 0, 4),
        background: theme.palette.gray[1],
        color: theme.palette.black[0],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.6),
        },
    },
    icon: {
        position: 'absolute',
        top: '52%',
        left: theme.rem(1.5),
        transform: 'translateY(-50%)',
        zIndex: 2,
        fontSize: theme.rem(1.2),
        color: theme.palette.gray[4],

        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),
        },
    },
    eye: {
        position: 'absolute',
        top: '52%',
        right: 0,
        zIndex: 2,
        height: '100%',
        width: theme.rem(5),
        transform: 'translateY(-50%)',
        fontSize: theme.rem(1.2),
        color: theme.palette.gray[4],

        '& svg': {
            height: theme.rem(2),
            width: theme.rem(2),
        },
    },
    link: {
        display: 'block',
        textAlign: 'center',
        margin: theme.rem(2, 0, 1),
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],

        '&:hover': {
            textDecoration: 'underline',
        },

        '@media (max-width: 500px)': {
            margin: theme.rem(3, 0),
            fontSize: theme.rem(1.6),
        },
    },
    btn: {
        display: 'block',
        minWidth: theme.rem(20),
        margin: '2rem auto 1rem',
        padding: theme.rem(1.5, 2),
        fontWeight: theme.text.weight[4],
        textAlign: 'center',
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,

        '@media (max-width: 500px)': {
            margin: '1rem auto 3rem',
            padding: theme.rem(2),
        },
    },
    text: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],
        textAlign: 'center',

        '@media (max-width: 500px)': {
            marginBottom: theme.rem(3),
        },
    },
    svg: {
        height: theme.rem(2),
        width: theme.rem(1.5),
        fill: 'inherit',
    },
}));

interface IError {
    username?: string;
    password?: string;
}

const INIT: ILogin = {
    username: '',
    password: '',
};

const LoginForm = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [unhidden, setUnhidden] = useState(true);

    const [errors, setErrors] = useState<IError>(INIT);
    const [value, setValue] = useState<ILogin>(INIT);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue((prev: ILogin): ILogin => ({ ...prev, [event.target.name]: event.target.value }));
        setErrors(INIT);
    };

    const handleClick = (): void => {
        setUnhidden(!unhidden);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setLoading(true);

        // Empty
        const empty: [string, string][] = isEmpty<ILogin>(value);
        if (empty.length) {
            const newErrors: IError = empty.reduce(
                (acc: IError, item): IError => ({ ...acc, [item[0]]: 'This is required field' }),
                {},
            );
            setErrors(newErrors);
            return;
        }

        // email
        if (!mailRegex.test(value.username)) {
            setValue((prev: ILogin): ILogin => ({ ...prev, username: '' }));
            setErrors({ username: 'Not valid email' });
            return;
        }

        dispatch({ type: types.LOGIN_START, payload: value });
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            <h2 className={css.title}>Бобро пожаловать, засранец.</h2>

            <div className={css.wrp}>
                <div className={css.icon}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <Input
                    type="email"
                    value={value.username}
                    onChange={handleChange}
                    name="username"
                    className={css.input}
                    errors={errors.username}
                    autoComplete="email"
                    errorsPlaceholder
                />
            </div>

            <div className={css.wrp}>
                <div className={css.icon}>
                    <FontAwesomeIcon icon={faKey} />
                </div>
                <button className={css.eye} onClick={handleClick} type="button">
                    {unhidden ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </button>
                <Input
                    type={unhidden ? 'password' : 'text'}
                    value={value.password}
                    name="password"
                    onChange={handleChange}
                    className={css.input}
                    errors={errors.password}
                    autoComplete="current-password"
                    errorsPlaceholder
                />
            </div>

            <Link href={routes.auth.forgot_pass}>
                <a className={css.link}>Забыли пароль?</a>
            </Link>
            <Link href={routes.auth.join}>
                <a className={css.link}>Зарегистрироваться</a>
            </Link>

            <button className={css.btn} style={loading ? { pointerEvents: 'none' } : {}} type="submit">
                {loading ? <Spinner /> : 'ВОЙТИ'}
            </button>

            <p className={css.text}>
                или
                <br />
                залогинтесь с
            </p>

            <GoogleFacebook />
        </form>
    );
};

export default LoginForm;
