import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme.rem(7),
    width: '100%',
    paddingLeft: theme.rem(2.5),
    background: theme.palette.gray[0],
    fontSize: theme.rem(1.2),
    borderRadius: theme.radius,
    border: theme.border(0.1, theme.palette.gray[1]),
  },
  input: {
    display: 'block',
    width: '100%',
    height: '100%',
    padding: theme.rem(2),
    background: 'none',
    border: 'none',
  },
  btn: {
    height: theme.rem(7),
    width: theme.rem(30),
    marginLeft: theme.rem(2),
    background: theme.palette.gray[3],
    fontSize: theme.rem(1.2),
    color: theme.text.color.white,
    borderRadius: theme.radius,
  },
}));

const Search = (): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.wrp}>
      <form action="#" method="post" className={css.serach}>
        <FontAwesomeIcon icon={faSearch} />
        <input className={css.input} type="text" placeholder="Что вы ищите?" />
      </form>
      <button className={css.btn}>Найти</button>
    </div>
  );
};

export default Search;
