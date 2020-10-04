import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  main: {
    margin: theme.rem(10, 0, 25),
  },
}));

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Main = ({ children }: Props): ReactElement => {
  const css = useStyles();
  return <main className={css.main}>{children}</main>;
};

export default Main;
