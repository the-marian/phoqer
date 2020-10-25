import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  num: {
    position: 'absolute',
    top: theme.rem(-2.2),
    right: theme.rem(-1.2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.rem(0.3, 0.7),
    background: theme.palette.red[0],
    borderRadius: theme.radius,
    color: theme.palette.white,
    fontSize: theme.rem(1.2),
    fontWeight: theme.text.weight[4],
  },
}));

const NewNotif = ({ children }: { children: string }): ReactElement => {
  const css = useStyles();
  return <span className={css.num}>{children}</span>;
};

export default NewNotif;
