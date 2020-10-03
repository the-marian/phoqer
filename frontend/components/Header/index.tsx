import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../config/theme';
import Container from '../common/Container';
import Logo from '../common/Logo';
import Lang from '../Lang';
import UserInfo from './UserInfo';

const useStyles = createUseStyles((theme: Theme) => ({
  header: {
    width: '100%',
    marginBottom: theme.rem(4),
    padding: theme.box.two(1, 0),
    background: theme.palette.gray[0],
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
      <Container>
        <div className={css.flex}>
          <div className={css.wrp}>
            <Logo />
            <Lang />
          </div>
          <UserInfo />
        </div>
      </Container>
    </header>
  );
};

export default Header;
