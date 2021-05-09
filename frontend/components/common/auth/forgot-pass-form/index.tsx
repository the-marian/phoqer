import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { mailRegex } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import template from '../../../../assets/template';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import Button from '../../button';
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
    input: {
        ...template(theme).input,
        padding: theme.rem(1, 2),
        background: theme.palette.gray[1],

        ...theme.media(500).max({
            fontSize: theme.rem(1.6),
        }),
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

        ...theme.hover({
            textDecoration: 'underline',
        }),

        ...theme.media(500).max({
            fontSize: theme.rem(1.6),
        }),
    },
    btn: {
        ...template(theme).btn,
        minWidth: theme.rem(20),
        margin: '3rem auto 5rem',

        ...theme.media(500).max({
            margin: '1rem auto 3rem',
        }),
    },
    text: {
        padding: theme.rem(1, 0),
        fontSize: theme.rem(1.2),
        textAlign: 'center',
        color: theme.palette.black[0],

        ...theme.media(500).max({
            fontSize: theme.rem(1.4),
        }),
    },
}));

const ForgotPassForm = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
        setError('');
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Empty
        if (!email.trim()) {
            setError('This is required field');
            return;
        }

        // email
        if (!mailRegex.test(email)) {
            setEmail('');
            setError('Not valid email');
            return;
        }

        alert('hi!');
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            <h2 className={css.title}>Добро пожаловать!</h2>

            <div className={css.wrp}>
                <div className={css.icon}>
                    <FontAwesomeIcon icon={faUserCircle} />
                </div>
                <Input
                    value={email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className={css.input}
                    errors={error}
                    autoComplete="email"
                    errorsInPlaceholder
                />
            </div>

            <Button className={css.btn} type="submit">
                {trans('restore_password')}
            </Button>

            <Link href={routes.auth.login}>
                <a className={css.link}>{trans('login')}</a>
            </Link>

            <p className={css.text}>или</p>

            <Link href={routes.auth.join}>
                <a className={css.link}>{trans('join')}</a>
            </Link>
        </form>
    );
};

export default ForgotPassForm;
