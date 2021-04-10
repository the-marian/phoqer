import React, { ChangeEvent, FormEvent, MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty, mailRegex, passwordRegex } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import { ISignup, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import Button from '../../button';
import GoogleFacebook from '../../google-facebook';
import Input from '../../input';

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
        display: 'block',
        margin: theme.rem(2, 0),
    },
    inner: {
        position: 'relative',
    },
    label: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 0,
        fontSize: theme.rem(1.2),
        fontWeight: theme.text.weight[3],
        color: theme.palette.black[0],

        ...theme.media(500).max({
            fontSize: theme.rem(1.6),
        }),
    },
    input: {
        background: theme.palette.gray[1],
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
    pass: {
        display: 'block',
        textAlign: 'right',
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],
    },
    btn: {
        display: 'block',
        minWidth: theme.rem(20),
        margin: '3rem auto 2rem',
        padding: theme.rem(1.5, 2),
        fontWeight: theme.text.weight[4],
        textAlign: 'center',
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,

        ...theme.media(500).max({
            margin: '5rem auto 3rem',
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
            marginBottom: theme.rem(2),
        }),
    },
    svg: {
        height: theme.rem(2),
        width: theme.rem(1.5),
        fill: 'inherit',
    },
    red: {
        fontSize: 'inherit',
        color: theme.palette.red[0],
    },
    green: {
        fontSize: 'inherit',
        color: theme.palette.green[0],
    },
}));

interface IError {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
}

const INIT: ISignup = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
};

const JoinForm = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError>(INIT);
    const [value, setValue] = useState<ISignup>(INIT);

    const loading = useSelector<IState, boolean>(state => state.auth.loading);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue((prev: ISignup): ISignup => ({ ...prev, [event.target.name]: event.target.value }));
        setErrors(INIT);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        // Empty
        const empty: [string, string][] = isEmpty<ISignup>(value);
        if (empty.length) {
            const newErrors: IError = empty.reduce<IError>(
                (acc: IError, item): IError => ({ ...acc, [item[0]]: 'This is required field' }),
                {},
            );
            setErrors(newErrors);
            return;
        }

        // email
        if (!mailRegex.test(value.email)) {
            setValue((prev: ISignup): ISignup => ({ ...prev, email: '' }));
            setErrors({ email: 'Not valid email' });
            return;
        }

        // password
        if (!passwordRegex.test(value.password)) {
            setValue((prev: ISignup): ISignup => ({ ...prev, password: '' }));
            setErrors({ password: 'Dont use weak password' });
            return;
        }

        dispatch({ type: types.SIGNUP_START, payload: value });
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            <h2 className={css.title}>Добро пожаловать!</h2>

            <label className={css.wrp}>
                <p className={css.label}>First Name</p>
                <Input
                    value={value.first_name}
                    errors={errors.first_name}
                    onChange={handleChange}
                    type="text"
                    name="first_name"
                    placeholder="first name"
                    className={css.input}
                    autoComplete="given-name"
                    errorsInPlaceholder
                />
            </label>

            <label className={css.wrp}>
                <p className={css.label}>Last Name</p>
                <Input
                    value={value.last_name}
                    errors={errors.last_name}
                    onChange={handleChange}
                    type="text"
                    name="last_name"
                    placeholder="last name"
                    autoComplete="family-name"
                    className={css.input}
                    errorsInPlaceholder
                />
            </label>

            <label className={css.wrp}>
                <p className={css.label}>Email</p>
                <Input
                    value={value.email}
                    errors={errors.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="email"
                    className={css.input}
                    errorsInPlaceholder
                />
            </label>

            <label className={css.wrp}>
                <p className={css.label}>
                    <span>Password</span>
                    {value.password.trim() &&
                        (passwordRegex.test(value.password) ? (
                            <small className={css.green}>Strong password</small>
                        ) : (
                            <small className={css.red}>Weak password</small>
                        ))}
                </p>

                <div className={css.inner}>
                    <Input
                        value={value.password}
                        errors={errors.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="password"
                        autoComplete="current-password"
                        className={css.input}
                        errorsInPlaceholder
                    />
                </div>
            </label>

            <Button loading={loading} className={css.btn} type="submit">
                ЗАРЕГИСТРИРОВАТЬСЯ
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

export default JoinForm;
