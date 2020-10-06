import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import { IDropList } from '../../../interfaces';
import DropDown from '../../common/DropDown';

const useStyles = createUseStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.rem(1),
    fontSize: theme.rem(1.6),
    fontWeight: theme.text.weight[2],
  },
}));

const FILTERS: IDropList[] = [
  { name: 'Самые популярные' },
  { name: 'От старых к новым' },
  { name: 'От новых к старым' },
  { name: 'От дешевых к дорогим' },
  { name: 'От дорогих к дешевым' },
];

const Sort = (): ReactElement => {
  const css = useStyles();
  return (
    <div>
      <h4 className={css.title}>Cортировать</h4>
      <DropDown value={FILTERS} onSubmit={console.log} />
    </div>
  );
};

export default Sort;
