import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../config/theme';
import { ICategories, IState } from '../../interfaces';

const useStyles = createUseStyles((theme: Theme) => ({
  wrp: {
    display: 'grid',
    gridTemplateColumns: theme.fr(6),
    gridGap: theme.rem(3),
    margin: theme.box.two(4, 0),
  },
  cat: {
    marginBottom: theme.rem(2),
    cursor: 'pointer',
  },
  img: {
    height: theme.rem(14),
    borderRadius: theme.radius,
    objectFit: 'cover',
  },
  text: {
    marginTop: theme.rem(1.5),
    fontSize: theme.rem(1.2),
  },
}));

const Categories = (): ReactElement => {
  const css = useStyles();
  const categories = useSelector<IState, ICategories[]>(
    state => state.categories,
  );
  return (
    <div className={css.wrp}>
      {categories?.map(({ name, image }) => (
        <Link key={name} href="/search?category=">
          <div className={css.cat}>
            <img className={css.img} src={image} alt={name} />
            <p className={css.text}>{name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
