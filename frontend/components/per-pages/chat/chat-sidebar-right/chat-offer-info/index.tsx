import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

import { IChatOfferInfo, IState } from '../../../../../interfaces';
import { cutString } from '../../../../../utils/helpers';
import routes from '../../../../../utils/routes';
import mixin from '../../../../../utils/theming/mixin';
import { Theme } from '../../../../../utils/theming/theme';
import Price from '../../../offers/single-offer/price';
import Requirements from '../../../offers/single-offer/requirements';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        fontSize: theme.rem(1.2),
    },
    banner: {
        height: theme.rem(20),
    },
    slider: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: theme.rem(20),

        ...theme.hover({
            '& .slick-arrow': {
                opacity: 1,
            },
        }),
        ...theme.focus({
            '& .slick-arrow': {
                opacity: 1,
            },
        }),

        '& .slick-track': {
            display: 'flex',
        },

        '& .slick-list': {
            width: '100%',
            overflow: 'hidden',
        },

        '& .slick-arrow': {
            position: 'absolute',
            top: '50%',
            zIndex: 5,
            transform: 'translateY(-50%)',
            opacity: 0,
            ...mixin(theme).btn,
            padding: theme.rem(1, 2.4),
            fontSize: 0,
            background: theme.palette.white,

            '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                height: theme.rem(1),
                width: theme.rem(1),
            },
        },

        '& .slick-next': {
            right: theme.rem(1),
            '&::before': {
                left: '45%',
                borderTop: theme.border(0.2, theme.palette.black[0]),
                borderRight: theme.border(0.2, theme.palette.black[0]),
            },
        },

        '& .slick-prev': {
            left: theme.rem(1),
            '&::before': {
                left: '55%',
                borderLeft: theme.border(0.2, theme.palette.black[0]),
                borderBottom: theme.border(0.2, theme.palette.black[0]),
            },
        },
    },
    img: {
        display: 'block',
        height: theme.rem(20),
        objectFit: 'cover',
        objectPosition: 'center',
        cursor: 'grab',
        borderRadius: theme.radius,
    },
    link: {
        color: theme.palette.black[0],

        ...theme.hover({
            textDecoration: 'underline',
        }),
        ...theme.focus({
            textDecoration: 'underline',
        }),
    },
    title: {
        margin: theme.rem(1, 0),
        fontSize: theme.rem(1.6),
        fontWeight: theme.text.weight[2],
    },
    text: {
        fontSize: theme.rem(1.2),
    },
    eye: {
        margin: theme.rem(2, 0),
        fontSize: theme.rem(1.4),
        '& span': {
            margin: theme.rem(0, 1),
        },
    },
}));

const ChatOfferInfo = (): ReactElement | null => {
    const css = useStyles();

    const offerInfo = useSelector<IState, IChatOfferInfo>(state => state.chat.info);
    const offer = offerInfo?.data;

    return offer ? (
        <div className={css.root}>
            <Slider
                slidesToShow={1}
                slidesToScroll={1}
                initialSlide={0}
                swipeToSlide
                autoplaySpeed={3000}
                autoplay
                draggable
                infinite
                lazyLoad="progressive"
                className={css.slider}
            >
                {offer.images?.map(item => (
                    <img key={item} className={css.img} src={item} alt="phoqer" />
                ))}
            </Slider>

            <Link href={routes.offers.single(offer.id)}>
                <a className={css.link}>
                    <h2 className={css.title}>{offer.title}</h2>
                    <p className={css.text}>{cutString(offer.description, 100)}</p>
                </a>
            </Link>

            <p className={css.eye}>
                <FontAwesomeIcon icon={faEye} />
                <span>{(offer?.views || 0) + 1}</span>
            </p>

            <Requirements offer={offer} />

            <Price offer={offer} />
        </div>
    ) : null;
};

export default ChatOfferInfo;
