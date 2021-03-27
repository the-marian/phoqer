import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { isEmpty, mailRegex } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import { ILogin } from '../../../../interfaces';
import types from '../../../../redux/types';
import Button from '../../../Layout/Button';
import Input from '../../../Layout/Input';
import GoogleFacebook from '../../GoogleFacebook';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[3],
        color: theme.palette.black[0],
        textAlign: 'center',

        ...theme.media(500).max({
            fontSize: theme.rem(2.4),
        }),
    },
    wrp: {
        position: 'relative',
        margin: theme.rem(2, 0),
    },
    link: {
        display: 'block',
        textAlign: 'center',
        margin: theme.rem(2, 0, 1),
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],

        ...theme.hover({
            textDecoration: 'underline',
        }),

        ...theme.media(500).max({
            margin: theme.rem(3, 0),
            fontSize: theme.rem(1.6),
        }),
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

        ...theme.media(500).max({
            margin: '1rem auto 3rem',
            padding: theme.rem(2),
        }),
    },
    text: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        color: theme.palette.black[0],
        textAlign: 'center',

        ...theme.media(500).max({
            marginBottom: theme.rem(3),
        }),
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

    const [errors, setErrors] = useState<IError>(INIT);
    const [value, setValue] = useState<ILogin>(INIT);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue((prev: ILogin): ILogin => ({ ...prev, [event.target.name]: event.target.value }));
        setErrors(INIT);
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
                <Input
                    icon={faUser}
                    type="email"
                    value={value.username}
                    onChange={handleChange}
                    name="username"
                    errors={errors.username}
                    autoComplete="email"
                    errorsInPlaceholder
                />
            </div>

            <div className={css.wrp}>
                <Input
                    icon={faKey}
                    type="password"
                    value={value.password}
                    name="password"
                    onChange={handleChange}
                    errors={errors.password}
                    autoComplete="current-password"
                    errorsInPlaceholder
                />
            </div>

            <Link href={routes.auth.forgot_pass}>
                <a className={css.link}>Забыли пароль?</a>
            </Link>
            <Link href={routes.auth.join}>
                <a className={css.link}>Зарегистрироваться</a>
            </Link>

            <Button loading={loading} className={css.btn} type="submit">
                ВОЙТИ
            </Button>

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
