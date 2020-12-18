import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FormEvent, ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import router from '../../../../assets/router';
import { Theme } from '../../../../assets/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        fontSize: theme.rem(1.8),
        fontWeight: theme.text.weight[3],
        textAlign: 'center',
    },
    wrp: {
        position: 'relative',
        margin: theme.rem(2, 0),
    },
    input: {
        display: 'block',
        width: '100%',
        height: theme.rem(5),
        paddingLeft: theme.rem(4),
        paddingRight: theme.rem(5),
        background: theme.palette.gray[1],
        border: 'none',
        borderRadius: theme.radius,
        fontSize: theme.rem(1.4),
        lineHeight: 1,
        outline: 'none',
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
    },
    text: {
        padding: theme.rem(1, 0),
        fontSize: theme.rem(1.2),
        textAlign: 'center',
    },
}));

const ForgotPassForm = (): ReactElement => {
    const css = useStyles();
    const handleSubmit = (event: FormEvent) => {
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

            <Link href={router.auth.login}>
                <a className={css.link}>Войти в личный кабинет</a>
            </Link>

            <p className={css.text}>или</p>

            <Link href={router.auth.join}>
                <a className={css.link}>Зарегистрироваться</a>
            </Link>
        </form>
    );
};

export default ForgotPassForm;
