import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../config/theme';
import UserInfo from './UserInfo';

const useStyles = createUseStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.rem(4),
    padding: theme.box.two(1, 4),
    background: theme.palette.gray,
  },
  logo: {
    width: 'auto',
    height: theme.rem(4),
  },
  img: {
    height: '100%',
    width: 'auto',
  },
}));

const Header = (): ReactElement => {
  const css = useStyles();
  return (
    <header className={css.header}>
      <Link href="/">
        <a className={css.logo}>
          <img className={css.img} src="/logo.png" alt="logo" />
        </a>
      </Link>
      <UserInfo />
    </header>
  );
};

export default Header;
