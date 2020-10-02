import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../config/theme';
import Logo from '../common/Logo';
import SiteMap from './SiteMap';

const useStyles = createUseStyles((theme: Theme) => ({
  footer: {
    marginTop: theme.rem(8),
    padding: theme.box.two(6, 8),
    background: theme.palette.gray,
  },
  wrp: {
    marginTop: theme.rem(8),
  },
}));

const Fotter = (): ReactElement => {
  const css = useStyles();
  return (
    <footer className={css.footer}>
      <Logo />
      <div className={css.wrp}>
        <SiteMap />
      </div>
    </footer>
  );
};

export default Fotter;
