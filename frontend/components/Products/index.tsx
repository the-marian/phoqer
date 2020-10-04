// import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../config/theme';
import products from '../../utils/products';
import SectionTitle from '../common/SectionTitle';
import Product from './Product';

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    fontSize: theme.rem(1.5),
    fontWeight: theme.text.weight[3],
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: theme.fr(4),
    gridGap: theme.rem(8, 3),
  },
}));

const Products = (): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.root}>
      <SectionTitle link="Смотреть все" href="/search?type=popular">
        Популярные товары
      </SectionTitle>

      <div className={css.grid}>
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
