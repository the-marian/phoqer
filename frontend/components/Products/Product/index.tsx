import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faSolidHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { Theme } from '../../../config/theme';
import { IProduct } from '../../../interfaces';

const useStyles = createUseStyles((theme: Theme) => ({
  link: {
    cursor: 'pointer',
    color: theme.text.color.black,
    '&:hover h3': {
      textDecoration: 'underline',
    },
  },
  imgWrp: {
    position: 'relative',
  },
  img: {
    height: theme.rem(25),
    borderRadius: theme.radius,
    objectFit: 'cover',
  },
  top: {
    position: 'absolute',
    top: theme.rem(1),
    right: theme.rem(1),
    padding: theme.rem(0.5, 0.8),
    background: theme.palette.white,
    borderRadius: theme.radius,
    color: theme.palette.yellow[0],
    fontSize: theme.rem(1),
    boxShadow: theme.shadow[0],
  },
  title: {
    margin: theme.rem(2, 0),
    fontSize: theme.rem(1.4),
    fontWeight: theme.text.weight[3],
  },
  desc: {
    fontSize: theme.rem(1.2),
    fontWeight: theme.text.weight[2],
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.rem(3, 0),
  },
  text: {
    margin: 0,
    color: theme.palette.gray[2],
    fontWeight: theme.text.weight[2],
    fontSize: theme.rem(1.2),
  },
  view: {
    paddingLeft: theme.rem(1),
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    padding: theme.rem(1.5, 3),
    fontSize: theme.rem(1.2),
    borderRadius: theme.radius,
    background: theme.palette.gray[0],
  },
  favorite: {
    marginLeft: theme.rem(2),
    color: theme.palette.red[0],
  },
  price: {
    margin: 0,
    fontSize: theme.rem(1.6),
    fontWeight: theme.text.weight[5],
    color: theme.text.color.black,
  },
}));

const Product = ({
  id,
  title,
  text,
  image,
  view,
  date,
  per,
  price,
  currency,
  favorite,
}: IProduct): ReactElement => {
  const css = useStyles();
  return (
    <div>
      <Link href={`/products/${id}`}>
        <a className={css.link}>
          <div className={css.imgWrp}>
            <div className={css.top}>
              <FontAwesomeIcon icon={faStar} />
            </div>
            <img className={css.img} src={image} alt={title} />
          </div>
          <h3 className={css.title}>{title}</h3>
          <p className={css.desc}>{text}</p>
        </a>
      </Link>

      <div className={css.info}>
        <p className={css.text}>
          <FontAwesomeIcon icon={faEye} />
          <span className={css.view}>{view}</span>
        </p>
        <p className={css.text}>Опубликовано: {date}</p>
      </div>

      <div className={css.action}>
        <div className={css.actionBtn}>
          <button type="button" className={css.btn}>
            Арендовать
          </button>
          <button type="button" className={css.favorite}>
            {favorite ? (
              <FontAwesomeIcon icon={faSolidHeart} />
            ) : (
              <FontAwesomeIcon icon={faHeart} />
            )}
          </button>
        </div>

        <p className={css.price}>
          {price} {currency}/{per}
        </p>
      </div>
    </div>
  );
};

export default Product;
