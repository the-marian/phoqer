import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import clsx from 'clsx';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import useTrans from '../../../../hooks/trans.hook';
import { ILogin, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import { isEmpty, mailRegex } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import { Theme } from '../../../../utils/theming/theme';
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
        position: 'relative',
        margin: theme.rem(2, 0),
    },
    link: {
        display: 'block',
        textAlign: 'center',
        margin: theme.rem(1, 0),
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],

        ...theme.hover({
            textDecoration: 'underline',
        }),

        ...theme.media(500).max({
            fontSize: theme.rem(1.6),
        }),
    },
    btn: {
        display: 'block',
        minWidth: theme.rem(20),
        margin: '2rem auto',
        padding: theme.rem(1.5, 2),
        fontWeight: theme.text.weight[4],
        textAlign: 'center',
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        background: theme.palette.primary[0],
        color: theme.palette.trueWhite,

        ...theme.media(500).max({
            padding: theme.rem(2),
        }),
    },
    btnLeft: {
        margin: '2rem 0',
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
    left: {
        textAlign: 'left',
    },
    socials: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialsLeft: {
        justifyContent: 'flex-start',
        marginLeft: theme.rem(-1),
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

interface IProps {
    left?: boolean;
}

const LoginForm = ({ left = false }: IProps): ReactElement => {
    const css = useStyles();
    const trans = useTrans();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState<IError>(INIT);
    const [value, setValue] = useState<ILogin>(INIT);

    const loading = useSelector<IState, boolean>(state => state.auth.loading);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue((prev: ILogin): ILogin => ({ ...prev, [event.target.name]: event.target.value }));
        setErrors(INIT);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        // Empty
        const empty: [string, string][] = isEmpty<ILogin>(value);
        if (empty.length) {
            const newErrors: IError = empty.reduce<IError>(
                (acc: IError, item): IError => ({ ...acc, [item[0]]: 'required_field' }),
                {},
            );
            setErrors(newErrors);
            return;
        }

        // email
        if (!mailRegex.test(value.username)) {
            setValue((prev: ILogin): ILogin => ({ ...prev, username: '' }));
            setErrors({ username: 'not_valid_email' });
            return;
        }

        dispatch({ type: types.LOGIN_START, payload: value });
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            <h2 className={clsx(css.title, left && css.left)}>{trans('welcome')}</h2>

            <div className={css.wrp}>
                <Input
                    icon={faUserCircle}
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
                <a className={clsx(css.link, left && css.left)}>{trans('forgot_your_password')}</a>
            </Link>
            <Link href={routes.auth.join}>
                <a className={clsx(css.link, left && css.left)}>{trans('join')}</a>
            </Link>

            <Button loading={loading} className={clsx(css.btn, left && css.btnLeft)} type="submit">
                {trans('login')}
            </Button>

            <p className={clsx(css.text, left && css.left)}>
                {trans('or')}
                <br />
                {trans('login_with')}
            </p>

            <div className={clsx(css.socials, left && css.socialsLeft)}>
                <GoogleFacebook />
            </div>
        </form>
    );
};

export default LoginForm;
