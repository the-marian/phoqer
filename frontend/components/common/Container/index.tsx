import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    margin: theme.box.two(0, 8),
  },
}));

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const Container = ({ children }: Props): ReactElement => {
  const css = useStyles();
  return <div className={css.container}>{children}</div>;
};

export default Container;
