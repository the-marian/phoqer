import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.modalBack,
  },
  img: {
    height: theme.rem(4),
    width: theme.rem(4),
  },
}));

const FullPage = (): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.wrp}>
      <img className={css.img} src="/spinner.gif" alt="spinner" />
    </div>
  );
};

export default FullPage;
