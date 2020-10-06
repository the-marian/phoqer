import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../config/theme';
import { ICategories, IState } from '../../../interfaces';
import { formateCatList } from '../../../utils/helpers';
import DropDown from '../../common/DropDown';

const useStyles = createUseStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.rem(1),
    fontSize: theme.rem(1.6),
    fontWeight: theme.text.weight[2],
  },
}));

const Categories = (): ReactElement => {
  const css = useStyles();
  const categories = useSelector<IState, ICategories[]>(
    state => state.categories,
  );
  return (
    <div>
      <h4 className={css.title}>Категория</h4>
      <DropDown
        value={formateCatList(categories)}
        onSubmit={console.log}
        toRight
      />
    </div>
  );
};

export default Categories;
