import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    margin: theme.rem(0, 8),

    '@media (max-width: 1100px)': {
      margin: theme.rem(0, 4),
    },

    '@media (max-width: 768px)': {
      margin: theme.rem(0, 2),
    },
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
