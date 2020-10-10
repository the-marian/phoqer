import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FormEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  title: {
    fontSize: theme.rem(1.8),
    fontWeight: theme.text.weight[3],
    textAlign: 'center',
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
  },
  input: {
    display: 'block',
    width: '100%',
    height: theme.rem(5),
    padding: theme.rem(1),
    paddingRight: theme.rem(5),
    background: theme.palette.blue[2],
    border: theme.border(0.1, theme.palette.gray[3]),
    borderRadius: theme.radius,
    fontSize: theme.rem(1.4),
    lineHeight: 1,
    outline: 'none',
  },
  eye: {
    position: 'absolute',
    top: '52%',
    right: 0,
    height: '100%',
    width: theme.rem(5),
    transform: 'translateY(-50%)',
    fontSize: theme.rem(1.2),
    color: theme.palette.gray[3],
  },
  pass: {
    display: 'block',
    textAlign: 'right',
    fontSize: theme.rem(1.4),
    color: theme.palette.blue[0],
  },
  btn: {
    display: 'block',
    margin: '3rem auto 2rem',
    padding: theme.rem(1.5, 2),
    fontWeight: theme.text.weight[4],
    textAlign: 'center',
    fontSize: theme.rem(1.4),
    borderRadius: theme.radius,
    background: theme.palette.grayblue[0],
  },
  text: {
    marginBottom: theme.rem(2),
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
    background: theme.palette.gray[1],
  },
  facebook: {
    background: theme.palette.blue[0],
  },
  google: {
    background: theme.palette.red[0],
  },
  svg: {
    height: theme.rem(2),
    width: theme.rem(1.5),
    fill: theme.palette.white,
  },
}));

const LoginForm = (): ReactElement => {
  const css = useStyles();
  const [password, setPassword] = useState(true);

  const hadleClick = () => {
    setPassword(!password);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
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
          <button className={css.eye} onClick={hadleClick} type="button">
            {password ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
          <input
            type={password ? 'password' : 'text'}
            name="password"
            className={css.input}
          />
        </div>
      </label>

      <Link href="/forgot_pass">
        <a className={css.pass}>Забыли пароль?</a>
      </Link>

      <button className={css.btn} type="submit">
        ЗАРЕГИСТРИРОВАТЬСЯ
      </button>

      <p className={css.text}>
        или
        <br />
        залогинтесь с
      </p>

      <ul className={css.list}>
        <li>
          <button
            className={`${css.socials} ${css.facebook}`}
            type="button"
            onClick={handleSubmit}
          >
            <svg
              className={css.svg}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
            >
              <path d="M288,176v-64c0-17.664,14.336-32,32-32h32V0h-64c-53.024,0-96,42.976-96,96v80h-64v80h64v256h96V256h64l32-80H288z" />
            </svg>
          </button>
        </li>
        <li>
          <button
            className={`${css.socials} ${css.google}`}
            type="button"
            onClick={handleSubmit}
          >
            <svg
              className={css.svg}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 510 510"
              xmlSpace="preserve"
            >
              <path d="M286.875,229.5v63.75h150.45c-15.3,89.25-86.7,153-175.95,153c-104.55,0-191.25-86.7-191.25-191.25    s86.7-191.25,191.25-191.25c53.55,0,99.45,22.95,132.6,58.65l45.9-45.9c-45.9-45.9-107.1-76.5-178.5-76.5    c-140.25,0-255,114.75-255,255s114.75,255,255,255s242.25-114.75,242.25-255v-25.5H286.875z" />
            </svg>
          </button>
        </li>
        <li>
          <button
            className={`${css.socials}`}
            type="button"
            onClick={handleSubmit}
          ></button>
        </li>
      </ul>
    </form>
  );
};

export default LoginForm;
