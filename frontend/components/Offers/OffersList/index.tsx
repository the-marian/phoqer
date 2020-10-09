import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../config/theme';
import { IOfferCard, IState } from '../../../interfaces';
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
  },
}));

const OffersList = (): ReactElement => {
  const css = useStyles();
  const popular = useSelector<IState, IOfferCard[]>(
    state => state.offers.popular,
  );

  return (
    <div className={css.root}>
      <div className={css.grid}>
        {popular?.map(product => (
          <OfferCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default OffersList;
