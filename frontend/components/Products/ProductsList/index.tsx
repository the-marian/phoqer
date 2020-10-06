import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import products from '../../../utils/products';
import Product from '../Product';

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    fontSize: theme.rem(1.5),
    fontWeight: theme.text.weight[3],
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: theme.fr(4),
    gridGap: theme.rem(10, 6),
    '@media (max-width: 1500px)': {
      gridTemplateColumns: theme.fr(3),
    },
    '@media (max-width: 1140px)': {
      gridTemplateColumns: theme.fr(2),
    },
  },
}));

const ProductsList = (): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.root}>
      <div className={css.grid}>
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
