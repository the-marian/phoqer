import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../config/theme';
import Container from '../common/Container';
import Logo from '../common/Logo';
import Socials from '../common/Socials';
import SiteMap from './SiteMap';

const useStyles = createUseStyles((theme: Theme) => ({
  footer: {
    marginTop: theme.rem(8),
    padding: theme.box.two(6, 0),
    background: theme.palette.gray[0],
  },
  wrp: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.rem(8),
  },
}));

const Fotter = (): ReactElement => {
  const css = useStyles();
  return (
    <footer className={css.footer}>
      <Container>
        <Logo />
        <div className={css.wrp}>
          <SiteMap />
          <Socials />
        </div>
      </Container>
    </footer>
  );
};

export default Fotter;
