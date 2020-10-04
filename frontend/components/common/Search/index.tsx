import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../config/theme';
import { ICategories, IDropList, IState } from '../../../interfaces';
import DropDown from '../DropDown';

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
  cat: {
    position: 'relative',
    width: theme.rem(50),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      height: '70%',
      width: theme.rem(0.1),
      background: theme.palette.gray[1],
    },
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

const formateCatList = (data: ICategories[]): IDropList[] =>
  data?.map(
    (item: ICategories): IDropList =>
      item.sub_categories
        ? { name: item.name, sub: item.sub_categories }
        : item,
  );

const Search = (): ReactElement => {
  const css = useStyles();
  const categories = useSelector<IState, ICategories[]>(
    state => state.categories,
  );
  return (
    <div className={css.wrp}>
      <form action="#" method="post" className={css.serach}>
        <FontAwesomeIcon icon={faSearch} />
        <input className={css.input} type="text" placeholder="Что вы ищите?" />
        <div className={css.cat}>
          {!!categories?.length && (
            <DropDown
              value={formateCatList(categories)}
              onSubmit={console.log}
              height={6.8}
              transparent
              toRight
            />
          )}
        </div>
      </form>
      <button className={css.btn}>Найти</button>
    </div>
  );
};

export default Search;
