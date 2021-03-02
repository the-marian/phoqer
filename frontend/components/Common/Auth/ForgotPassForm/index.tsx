import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FormEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[3],
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
        padding: theme.rem(1, 2),
        background: theme.palette.gray[1],

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
    },
    link: {
        display: 'block',
        textAlign: 'center',
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.6),
        },
    },
    btn: {
        display: 'block',
        minWidth: theme.rem(20),
        margin: '3rem auto 5rem',
        padding: theme.rem(1.5, 2),
        fontWeight: theme.text.weight[4],
        textAlign: 'center',
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        background: theme.palette.primary[0],
        color: theme.palette.white,

        '@media (max-width: 500px)': {
            margin: '1rem auto 3rem',
            padding: theme.rem(2),
        },
    },
    text: {
        padding: theme.rem(1, 0),
        fontSize: theme.rem(1.2),
        textAlign: 'center',

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.4),
        },
    },
}));

const ForgotPassForm = (): ReactElement => {
    const css = useStyles();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('fuck you!');
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            <h2 className={css.title}>Бобро пожаловать, засранец.</h2>

            <div className={css.wrp}>
                <div className={css.icon}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <input type="email" name="email" className={css.input} />
            </div>

            <button className={css.btn} type="submit">
                ВОСТАНОВИТЬ ПАРОЛЬ
            </button>

            <Link href={routes.auth.login}>
                <a className={css.link}>Войти в личный кабинет</a>
            </Link>

            <p className={css.text}>или</p>

            <Link href={routes.auth.join}>
                <a className={css.link}>Зарегистрироваться</a>
            </Link>
        </form>
    );
};

export default ForgotPassForm;
