import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import { Login } from '../../../../interfaces';
import types from '../../../../redux/types';
import Spinner from '../../Preloaders/Spinner';

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
        fontSize: theme.rem(1.4),
        color: theme.palette.primary[0],
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
        color: theme.palette.white,
    },
    text: {
        marginBottom: theme.rem(1),
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],
        textAlign: 'center',
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    socials: {
        height: theme.rem(6),
        width: theme.rem(6),
        margin: theme.rem(1),
        padding: theme.rem(1),
        borderRadius: '50%',
    },
    facebook: {
        background: '#385C8E',
        fill: theme.palette.black,
    },
    google: {
        background: theme.palette.gray[1],
        fill: theme.palette.black,
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

    const handleClick = () => {
        setUnhidden(!unhidden);
    };

    const handleSubmit = (event: FormEvent) => {
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

            <button className={css.btn} style={loading ? { pointerEvents: 'none' } : {}} type="submit">
                {loading ? <Spinner /> : 'ВОЙТИ'}
            </button>

            <p className={css.text}>
                или
                <br />
                залогинтесь с
            </p>

            <ul className={css.list}>
                <li>
                    <button className={clsx(css.socials, css.facebook)} type="button" onClick={handleSubmit}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            id="Layer_1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 512 512"
                            xmlSpace="preserve"
                        >
                            <path
                                style={{ fill: '#ffffff' }}
                                d="M134.941,272.691h56.123v231.051c0,4.562,3.696,8.258,8.258,8.258h95.159  c4.562,0,8.258-3.696,8.258-8.258V273.78h64.519c4.195,0,7.725-3.148,8.204-7.315l9.799-85.061c0.269-2.34-0.472-4.684-2.038-6.44  c-1.567-1.757-3.81-2.763-6.164-2.763h-74.316V118.88c0-16.073,8.654-24.224,25.726-24.224c2.433,0,48.59,0,48.59,0  c4.562,0,8.258-3.698,8.258-8.258V8.319c0-4.562-3.696-8.258-8.258-8.258h-66.965C309.622,0.038,308.573,0,307.027,0  c-11.619,0-52.006,2.281-83.909,31.63c-35.348,32.524-30.434,71.465-29.26,78.217v62.352h-58.918c-4.562,0-8.258,3.696-8.258,8.258  v83.975C126.683,268.993,130.379,272.691,134.941,272.691z"
                            />
                        </svg>
                    </button>
                </li>
                <li>
                    <button className={clsx(css.socials, css.google)} type="button" onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512" viewBox="0 0 512 512">
                            <g>
                                <path
                                    d="m120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308h-86.308c-34.255 44.488-52.823 98.707-52.823 155.785s18.568 111.297 52.823 155.785h86.308v-86.308c-12.142-20.347-19.131-44.11-19.131-69.477z"
                                    fill="#fbbd00"
                                />
                                <path
                                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216c-20.525 12.186-44.388 19.039-69.569 19.039z"
                                    fill="#0f9d58"
                                />
                                <path
                                    d="m139.131 325.477-86.308 86.308c6.782 8.808 14.167 17.243 22.158 25.235 48.352 48.351 112.639 74.98 181.019 74.98v-120c-49.624 0-93.117-26.72-116.869-66.523z"
                                    fill="#31aa52"
                                />
                                <path
                                    d="m512 256c0-15.575-1.41-31.179-4.192-46.377l-2.251-12.299h-249.557v120h121.452c-11.794 23.461-29.928 42.602-51.884 55.638l86.216 86.216c8.808-6.782 17.243-14.167 25.235-22.158 48.352-48.353 74.981-112.64 74.981-181.02z"
                                    fill="#3c79e6"
                                />
                                <path
                                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606c-48.352-48.352-112.639-74.981-181.02-74.981l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                    fill="#cf2d48"
                                />
                                <path
                                    d="m256 120v-120c-68.38 0-132.667 26.629-181.02 74.98-7.991 7.991-15.376 16.426-22.158 25.235l86.308 86.308c23.753-39.803 67.246-66.523 116.87-66.523z"
                                    fill="#eb4132"
                                />
                            </g>
                        </svg>
                    </button>
                </li>
            </ul>
        </form>
    );
};

export default LoginForm;
