import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  title: {
    fontSize: theme.rem(2),
  },
}));

const SectionTitle = (): ReactElement => {
  const css = useStyles();
  return <h2 className={css.title}>Lorem</h2>;
};

export default SectionTitle;
