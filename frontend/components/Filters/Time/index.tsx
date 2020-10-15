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
  { name: 'Час', slug: 'hour' },
  { name: 'День', slug: 'day' },
  { name: 'Неделя', slug: 'week' },
  { name: 'Месяц', slug: 'month' },
];

const Time = (): ReactElement => {
  const css = useStyles();
  return (
    <div>
      <h4 className={css.title}>Оплата за</h4>
      <DropDown value={FILTERS} onSubmit={console.log} />
    </div>
  );
};

export default Time;
