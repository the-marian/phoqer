import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart, faStar, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

import { moneyFormat } from '../../../../assets/helpers';
import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { IOfferCard } from '../../../../interfaces';

const MAX_LENGTH = 60;
const MAX_LENGTH_TITLE = 55;

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
        height: theme.rem(20),
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: theme.radius,
        boxShadow: theme.shadow[1],
        background: theme.palette.gray[1],
        ...theme.outline,

        '@media (max-width: 580px)': {
            height: theme.rem(30),
        },
    },
    topWrp: {
        position: 'absolute',
        top: theme.rem(1),
        right: theme.rem(1),
        display: 'flex',
    },
    top: {
        margin: theme.rem(0, 0.5),
        padding: theme.rem(0.5, 0.8),
        background: theme.palette.white,
        borderRadius: theme.radius,
        fontSize: theme.rem(1),
        boxShadow: theme.shadow[0],
        color: theme.palette.yellow[0],

        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),
        },
    },
    delivery: {
        color: theme.palette.primary[0],
    },
    title: {
        margin: theme.rem(1, 0),
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.8),
        },
    },
    desc: {
        margin: 0,
        fontSize: theme.rem(1.4),
        fontWeight: theme.text.weight[2],

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.6),
        },
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: theme.rem(2, 0),
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        color: theme.palette.gray[3],
        fontWeight: theme.text.weight[2],
        fontSize: theme.rem(1.4),

        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),
        },
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
        padding: theme.rem(1.5, 2),
        fontSize: theme.rem(1.4),
        borderRadius: theme.radius,
        background: theme.palette.gray[1],
        color: theme.palette.primary[0],
        ...theme.outline,

        '@media (max-width: 500px)': {
            padding: theme.rem(2, 4),
            fontSize: theme.rem(1.8),
        },
    },
    favorite: {
        height: theme.rem(4.8),
        marginLeft: theme.rem(0.6),
        padding: theme.rem(1, 1.8),
        color: theme.palette.primary[0],
        borderRadius: theme.radius,
        ...theme.outline,

        '& svg': {
            height: theme.rem(1.8),
            width: theme.rem(1.8),

            '@media (max-width: 500px)': {
                height: theme.rem(2.2),
                width: theme.rem(2.2),
            },
        },
    },
    price: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],
        color: theme.palette.black[0],
        textTransform: 'lowercase',
        textAlign: 'right',

        '& small': {
            fontWeight: theme.text.weight[2],
            fontSize: theme.rem(1.2),
            color: theme.palette.gray[3],
        },

        '@media (max-width: 500px)': {
            fontSize: theme.rem(1.8),

            '& small': {
                fontSize: theme.rem(1.4),
            },
        },
    },
}));

interface IProps {
    offer: IOfferCard;
}

const OfferCard = ({ offer }: IProps): ReactElement => {
    const css = useStyles();
    const T = useTrans();
    const { id, title, description, cover_image, is_promoted, is_deliverable, is_favorite, views, pub_date, price } = offer;

    return (
        <div className={css.root}>
            <Link href={routes.offers.single()} as={routes.offers.single(id)}>
                <a className={css.link}>
                    <div className={css.imgWrp}>
                        <div className={css.topWrp}>
                            {is_promoted && (
                                <div className={css.top}>
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                            )}
                            {is_deliverable && (
                                <div className={clsx(css.top, css.delivery)}>
                                    <FontAwesomeIcon icon={faTruck} />
                                </div>
                            )}
                        </div>
                        <img className={css.img} src={cover_image} alt={title} />
                    </div>
                    <h3 className={css.title}>
                        {title.length > MAX_LENGTH_TITLE ? title.slice(0, MAX_LENGTH_TITLE - 3) + '...' : title}
                    </h3>
                    <p className={css.desc}>
                        {description.length > MAX_LENGTH ? `${description.slice(0, MAX_LENGTH - 3)}...` : description}
                    </p>
                </a>
            </Link>

            <div className={css.info}>
                <p className={css.text}>
                    <FontAwesomeIcon icon={faEye} />
                    <span className={css.view}>{views}</span>
                </p>
                <p className={css.text}>
                    {T.date}: {pub_date}
                </p>
            </div>

            <div className={css.action}>
                <div className={css.actionBtn}>
                    <button type="button" className={css.btn}>
                        {T.rent}
                    </button>

                    <button type="button" className={css.favorite}>
                        {is_favorite ? <FontAwesomeIcon icon={faSolidHeart} /> : <FontAwesomeIcon icon={faHeart} />}
                    </button>
                </div>

                <p className={css.price}>
                    <span>{moneyFormat(price)}.00</span>
                    <small>{`*${T.uah}/${T.day}`}</small>
                </p>
            </div>
        </div>
    );
};

export default OfferCard;
