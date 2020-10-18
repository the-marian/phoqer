import Link from 'next/link';
import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../config/theme';
import { IOfferPopular, IState } from '../../../interfaces';
import types from '../../../redux/types';
import OffersLoader from '../../common/Preloaders/OffersLoader';
import SectionTitle from '../../common/SectionTitle';
import OfferCard from '../OfferCard';

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
    '@media (max-width: 960px)': {
      gridGap: theme.rem(6, 3),
    },
    '@media (max-width: 560px)': {
      gridTemplateColumns: theme.fr(1),
      maxWidth: theme.rem(40),
      margin: '0 auto',
    },
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.rem(25),
    height: theme.rem(6),
    margin: '10rem auto 0',
    padding: theme.rem(1, 4),
    textAlign: 'center',
    fontSize: theme.rem(1.4),
    color: theme.palette.white,
    borderRadius: theme.radius,
    background: theme.palette.blue[0],

    '@media (max-width: 550px)': {
      margin: '4rem auto 0',
    },
  },
}));

const TopPopular = (): ReactElement => {
  const css = useStyles();
  const dispatch = useDispatch();
  const { data, loading } = useSelector<IState, IOfferPopular>(
    state => state.offers.popular,
  );

  useEffect(() => {
    dispatch({ type: types.GET_POPULAR_OFFERS_START });
  }, [dispatch]);

  return (
    <div className={css.root}>
      <SectionTitle link="Смотреть все" href="/offers?type=popular">
        Популярные товары
      </SectionTitle>

      <div className={css.grid}>
        {loading ? (
          <OffersLoader />
        ) : (
          !!data &&
          data.map(product => <OfferCard key={product.id} {...product} />)
        )}
      </div>

      <Link href="/offers">
        <a className={css.btn}>Смотреть все</a>
      </Link>
    </div>
  );
};

export default TopPopular;
