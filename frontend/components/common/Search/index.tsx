import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serach: {
    borderRadius: theme.radius,
    background: theme.palette.gray[0],
  },
}));

const Search = (): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.wrp}>
      <div className={css.serach}>
        <input type="text" />
      </div>
    </div>
  );
};

export default Search;
