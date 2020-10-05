import Link from 'next/link';
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
    '@media (max-width: 1500px)': {
      gridTemplateColumns: theme.fr(3),
    },
    '@media (max-width: 1140px)': {
      gridTemplateColumns: theme.fr(2),
    },
  },
  btn: {
    display: 'block',
    width: theme.rem(25),
    margin: '15rem auto 0',
    padding: theme.rem(1.5, 3),
    textAlign: 'center',
    fontSize: theme.rem(1.4),
    color: theme.text.color.black,
    borderRadius: theme.radius,
    background: theme.palette.gray[0],
  },
}));

const Products = (): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.root}>
      <SectionTitle link="Смотреть все" href="/products?type=popular">
        Популярные товары
      </SectionTitle>

      <div className={css.grid}>
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      <Link href="/products">
        <a className={css.btn}>Смотреть все</a>
      </Link>
    </div>
  );
};

export default Products;
