import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import products from '../../../utils/products';
import SectionTitle from '../../common/SectionTitle';
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
  btn: {
    display: 'block',
    width: theme.rem(25),
    margin: '10rem auto 0',
    padding: theme.rem(2, 4),
    textAlign: 'center',
    fontSize: theme.rem(1.4),
    color: theme.palette.white,
    borderRadius: theme.radius,
    background: theme.palette.blue[0],
  },
}));

const TopPopular = (): ReactElement => {
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

export default TopPopular;
