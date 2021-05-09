import clsx from 'clsx';
import React, { ChangeEvent, FormEvent, MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty, mailRegex, passwordRegex } from '../../../../assets/helpers';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
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
        fontSize: theme.rem(1.4),
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
        fontSize: theme.rem(1.6),
        color: theme.palette.primary[0],
    },
    btn: {
        display: 'block',
        minWidth: theme.rem(20),
        margin: '3rem auto 2rem',
        padding: theme.rem(1.5, 2),
        fontWeight: theme.text.weight[4],
        textAlign: 'center',
        fontSize: theme.rem(1.6),
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
        fontSize: theme.rem(1.6),
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
    list: {
        margin: theme.rem(0.5, 0, 1),
        fontSize: theme.rem(1.4),
    },
    red: {
        position: 'relative',
        padding: theme.rem(0, 2, 0, 1),
        color: theme.palette.gray[2],
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '48%',
            left: 0,
            transform: 'translateY(-50%)',
            height: theme.rem(0.6),
            width: theme.rem(0.6),
            background: theme.palette.gray[2],
            borderRadius: theme.radius,
        },
    },
    green: {
        color: theme.palette.black[0],
        '&::before': {
            background: theme.palette.green[0],
        },
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
    const trans = useTrans();
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
                (acc: IError, item): IError => ({ ...acc, [item[0]]: 'required_field' }),
                {},
            );
            setErrors(newErrors);
            return;
        }

        // email
        if (!mailRegex.test(value.email)) {
            setValue((prev: ISignup): ISignup => ({ ...prev, email: '' }));
            setErrors({ email: 'not_valid_email' });
            return;
        }

        // password
        if (!passwordRegex.test(value.password)) {
            setValue((prev: ISignup): ISignup => ({ ...prev, password: '' }));
            setErrors({ password: 'weak_password_error' });
            return;
        }

        dispatch({ type: types.SIGNUP_START, payload: value });
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            <h2 className={css.title}>{trans('welcome')}</h2>

            <label className={css.wrp}>
                <p className={css.label}>{trans('first_name')}</p>
                <Input
                    value={value.first_name}
                    errors={errors.first_name}
                    onChange={handleChange}
                    type="text"
                    name="first_name"
                    placeholder={trans('first_name')}
                    className={css.input}
                    autoComplete="given-name"
                    errorsInPlaceholder
                />
            </label>

            <label className={css.wrp}>
                <p className={css.label}>{trans('last_name')}</p>
                <Input
                    value={value.last_name}
                    errors={errors.last_name}
                    onChange={handleChange}
                    type="text"
                    name="last_name"
                    placeholder={trans('last_name')}
                    autoComplete="family-name"
                    className={css.input}
                    errorsInPlaceholder
                />
            </label>

            <label className={css.wrp}>
                <p className={css.label}>{trans('email')}</p>
                <Input
                    value={value.email}
                    errors={errors.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={trans('email')}
                    className={css.input}
                    errorsInPlaceholder
                />
            </label>

            <label className={css.wrp}>
                <p className={css.label}>{trans('password')}</p>
                <ul className={css.list}>
                    <li className={clsx(css.red, value.password.length > 7 && css.green)}>{trans('minimum_characters')}</li>
                    <li className={clsx(css.red, /[0-9]+[a-z]+|[a-z]+[0-9]+/.test(value.password) && css.green)}>
                        {trans('numbers_letters')}
                    </li>
                    <li className={clsx(css.red, /[A-Z]/.test(value.password) && css.green)}>{trans('uppercase')}</li>
                    <li className={clsx(css.red, /[_#?!@$%^&*-]/.test(value.password) && css.green)}>
                        {trans('special_characters')}
                    </li>
                </ul>
                <div className={css.inner}>
                    <Input
                        value={value.password}
                        errors={errors.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder={trans('password')}
                        autoComplete="current-password"
                        className={css.input}
                        errorsInPlaceholder
                    />
                </div>
            </label>

            <Button loading={loading} className={css.btn} type="submit">
                {trans('join')}
            </Button>

            <p className={css.text}>
                {trans('or')}
                <br />
                {trans('login_with')}
            </p>

            <GoogleFacebook />
        </form>
    );
};

export default JoinForm;
