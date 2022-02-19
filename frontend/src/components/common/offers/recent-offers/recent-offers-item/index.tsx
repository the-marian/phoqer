import React from 'react';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';

import { IRecentOffers } from '../../../../../interfaces';
import { formatTimestamp } from '../../../../../utils/helpers';
import routes from '../../../../../utils/routes';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    card: {
        background: theme.palette.gray[1],
        borderRadius: theme.radius,
        border: theme.border(0.2, theme.palette.gray[1]),
        overflow: 'hidden',

        ...theme.hover({
            '& p': {
                textDecoration: 'underline',
            },
            '& svg': {
                color: theme.palette.primary[0],
                transform: 'translateX(0.4rem)',
            },
        }),
    },
    img: {
        width: '100%',
        height: theme.rem(20),
        objectFit: 'cover',
        background: theme.palette.white,

        ...theme.media(768).max({
            height: theme.rem(11),
        }),
    },

    container: {
        position: 'relative',
        display: 'block',
        padding: theme.rem(3, 2, 5.5),

        ...theme.media(768).max({
            padding: theme.rem(1, 1, 4),
        }),
    },
    title: {
        fontWeight: theme.text.weight[4],
        color: theme.palette.black[0],

        ...mixin(theme).cutStringMultiLine(2, 1.3),
    },
    date: {
        display: 'block',
        marginBottom: theme.rem(0.5),
        fontSize: theme.rem(1.1),
        color: theme.palette.gray[4],
    },
    icon: {
        position: 'absolute',
        bottom: theme.rem(3),
        left: theme.rem(2),
        fontSize: theme.rem(1.5),
        color: theme.palette.black[0],
        transition: theme.transitions[0],

        ...theme.media(768).max({
            bottom: theme.rem(1.5),
            left: theme.rem(1.2),
        }),
    },
}));

interface IProps {
    offer: IRecentOffers;
}

const RecentOffersItem = ({ offer }: IProps): JSX.Element => {
    const css = useStyles();
    return (
        <Link href={routes.offers.single(offer.id)}>
            <a className={css.card}>
                <img className={css.img} src={offer.img || '/icons/no_img.png'} alt={offer.title} />

                <div className={css.container}>
                    <small className={css.date}>{formatTimestamp(offer.date)}</small>
                    <p className={css.title}>{offer.title}</p>

                    <FontAwesomeIcon className={css.icon} icon={faArrowRight} />
                </div>
            </a>
        </Link>
    );
};

export default RecentOffersItem;
