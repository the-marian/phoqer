import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  logo: {
    display: 'block',
    width: 'max-content',
    height: theme.rem(4),
    marginRight: theme.rem(2),
  },
  img: {
    height: '100%',
    width: 'auto',
  },
}));

const Logo = (): ReactElement => {
  const css = useStyles();
  return (
    <Link href="/">
      <a className={css.logo}>
        <img className={css.img} src="/logo.png" alt="logo" />
      </a>
    </Link>
  );
};

export default Logo;
