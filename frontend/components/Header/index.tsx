import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../config/theme';
import Logo from '../common/Logo';
import Lang from '../Lang';
import UserInfo from './UserInfo';

const useStyles = createUseStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.rem(4),
    padding: theme.box.two(1, 8),
    background: theme.palette.gray,
  },
  wrp: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Header = (): ReactElement => {
  const css = useStyles();
  return (
    <header className={css.header}>
      <div className={css.wrp}>
        <Logo />
        <Lang />
      </div>

      <UserInfo />
    </header>
  );
};

export default Header;
