import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../config/theme';
import { ICategories, IState } from '../../interfaces';
import SectionTitle from '../common/SectionTitle';

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    margin: theme.rem(5, 0),
    '@media (max-width: 550px)': {
      margin: theme.rem(2, 0),
    },
  },
  wrp: {
    display: 'grid',
    gridTemplateColumns: theme.fr(7),
    gridGap: theme.rem(4, 3),
    '@media (max-width: 1200px)': {
      gridTemplateColumns: theme.fr(5),
    },
    '@media (max-width: 1000px)': {
      gridTemplateColumns: theme.fr(4),
    },
    '@media (max-width: 780px)': {
      gridTemplateColumns: theme.fr(3),
    },
    '@media (max-width: 550px)': {
      gridTemplateColumns: theme.fr(2),
      gridGap: theme.rem(2, 1.5),
    },
  },
  cat: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.blue[0],
    },
  },
  img: {
    height: theme.rem(14),
    borderRadius: theme.radius,
    objectFit: 'cover',
  },
  text: {
    marginTop: theme.rem(1.5),
    fontSize: theme.rem(1.6),
  },
}));

const Categories = (): ReactElement => {
  const css = useStyles();
  const categories = useSelector<IState, ICategories[]>(
    state => state.categories,
  );
  return (
    <div className={css.root}>
      <SectionTitle>Арендуйте здесь и сейчас</SectionTitle>

      <div className={css.wrp}>
        {categories?.map(({ name, image, slug }) => (
          <Link key={name} href={`/offers?category=${slug}`}>
            <div className={css.cat}>
              <img className={css.img} src={image} alt={name} />
              <p className={css.text}>{name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
