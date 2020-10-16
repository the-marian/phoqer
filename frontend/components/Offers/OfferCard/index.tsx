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
import { IOfferCard } from '../../../interfaces';

const MAX_LENGTH = 85;

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    flexGrow: 2,
    cursor: 'pointer',
    color: theme.palette.black[0],
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
    boxShadow: theme.shadow[3],
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
    fontSize: theme.rem(1.6),
    fontWeight: theme.text.weight[3],
  },
  desc: {
    margin: 0,
    fontSize: theme.rem(1.4),
    fontWeight: theme.text.weight[2],
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.rem(2, 0, 3),
  },
  text: {
    margin: 0,
    color: theme.palette.gray[3],
    fontWeight: theme.text.weight[2],
    fontSize: theme.rem(1.4),
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
    fontSize: theme.rem(1.4),
    borderRadius: theme.radius,
    background: theme.palette.grayblue[0],
  },
  favorite: {
    marginLeft: theme.rem(2),
    color: theme.palette.red[0],
  },
  price: {
    margin: 0,
    fontSize: theme.rem(1.6),
    fontWeight: theme.text.weight[5],
    color: theme.palette.black[0],
  },
}));

const OfferCard = ({
  id,
  title,
  description,
  cover_image,
  is_favorite,
  views,
  pud_date,
  per,
  type,
  price,
  currency,
}: IOfferCard): ReactElement => {
  const css = useStyles();
  return (
    <div className={css.root}>
      <Link href="/offers/:offerId" as={`/offers/${id}`}>
        <a className={css.link}>
          <div className={css.imgWrp}>
            {type?.includes('top') && (
              <div className={css.top}>
                <FontAwesomeIcon icon={faStar} />
              </div>
            )}
            <img className={css.img} src={cover_image} alt={title} />
          </div>
          <h3 className={css.title}>{title}</h3>
          <p className={css.desc}>
            {description.length > MAX_LENGTH
              ? `${description.slice(0, MAX_LENGTH - 3)}...`
              : description}
          </p>
        </a>
      </Link>

      <div className={css.info}>
        <p className={css.text}>
          <FontAwesomeIcon icon={faEye} />
          <span className={css.view}>{views}</span>
        </p>
        <p className={css.text}>Опубликовано: {pud_date}</p>
      </div>

      <div className={css.action}>
        <div className={css.actionBtn}>
          <button type="button" className={css.btn}>
            Арендовать
          </button>

          <button type="button" className={css.favorite}>
            {is_favorite ? (
              <FontAwesomeIcon icon={faSolidHeart} />
            ) : (
              <FontAwesomeIcon icon={faHeart} />
            )}
          </button>
        </div>

        <p className={css.price}>
          {price} {currency} / {per}
        </p>
      </div>
    </div>
  );
};

export default OfferCard;
