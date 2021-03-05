import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import { Login } from '../../../../interfaces';
import types from '../../../../redux/types';
import GoogleFacebook from '../../GoogleFacebook';
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
        ...theme.input,
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
        margin: theme.rem(2, 0),
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

const LoginForm = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [unhidden, setUnhidden] = useState(true);
    const [payload, setPayload] = useState<Login>({ password: '', email: '' });

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setPayload({ ...payload, [event.target.name]: event.target.value });
    };

    const handleClick = (): void => {
        setUnhidden(!unhidden);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setLoading(true);
        dispatch({ type: types.LOGIN_START, payload });
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            <h2 className={css.title}>Бобро пожаловать, засранец.</h2>

            <div className={css.wrp}>
                <div className={css.icon}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <input type="email" onChange={handleChange} name="email" className={css.input} />
            </div>

            <div className={css.wrp}>
                <div className={css.icon}>
                    <FontAwesomeIcon icon={faKey} />
                </div>
                <button className={css.eye} onClick={handleClick} type="button">
                    {unhidden ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </button>
                <input type={unhidden ? 'password' : 'text'} name="password" onChange={handleChange} className={css.input} />
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
