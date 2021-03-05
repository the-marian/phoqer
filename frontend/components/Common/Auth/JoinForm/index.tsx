import { faEye } from '@fortawesome/free-regular-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons/faEyeSlash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../assets/theme';
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
        display: 'block',
        margin: theme.rem(2, 0),
    },
    inner: {
        position: 'relative',
    },
    label: {
        margin: 0,
        fontSize: theme.rem(1.2),
        fontWeight: theme.text.weight[3],
        color: theme.palette.black[0],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.6),
        },
    },
    input: {
        ...theme.input,
        padding: theme.rem(0, 5, 0, 2),
        background: theme.palette.gray[1],
        color: theme.palette.black[0],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.6),
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

        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),
        },

        '@media (max-width: 500px)': {
            margin: '5rem auto 3rem',
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
            marginBottom: theme.rem(2),
        },
    },
    svg: {
        height: theme.rem(2),
        width: theme.rem(1.5),
        fill: 'inherit',
    },
}));

const JoinForm = (): ReactElement => {
    const css = useStyles();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(true);

    const handleClick = () => {
        setPassword(!password);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLoading(true);
        alert('fuck you!');
    };

    return (
        <form action="#" method="post" onSubmit={handleSubmit}>
            <h2 className={css.title}>Бобро пожаловать, засранец.</h2>

            <label className={css.wrp}>
                <p className={css.label}>Full Name</p>
                <input type="text" name="full_name" className={css.input} />
            </label>

            <label className={css.wrp}>
                <p className={css.label}>Email</p>
                <input type="email" name="email" className={css.input} />
            </label>

            <label className={css.wrp}>
                <p className={css.label}>Password</p>

                <div className={css.inner}>
                    <button className={css.eye} onClick={handleClick} type="button">
                        {password ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </button>
                    <input type={password ? 'password' : 'text'} name="password" className={css.input} />
                </div>
            </label>

            <button className={css.btn} style={loading ? { pointerEvents: 'none' } : {}} type="submit">
                {loading ? <Spinner /> : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
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

export default JoinForm;
