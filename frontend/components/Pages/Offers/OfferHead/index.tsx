import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faEye, faHeart as faFillHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../../assets/theme';
import { IOfferCard, IState } from '../../../../interfaces';

const useStyles = createUseStyles((theme: Theme) => ({
    title: {
        margin: theme.rem(0, 0, 1),
        fontSize: theme.rem(4),
        fontWeight: theme.text.weight[3],
        lineHeight: 1,
    },
    action: {
        display: 'flex',
        alignItems: 'center',

        '@media (max-width: 768px)': {
            fontSize: theme.rem(1.6),
        },
    },
    favorite: {
        margin: theme.rem(0, 2),
        padding: theme.rem(1, 1.5),
        color: theme.palette.primary[0],
        borderRadius: theme.radius,

        '&:hover': {
            background: theme.palette.gray[1],
        },
        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),

            '@media (max-width: 768px)': {
                height: theme.rem(1.8),
                width: theme.rem(1.8),
            },
        },
    },
    eye: {
        margin: theme.rem(0, 0, 0, 6),
        '& span': {
            margin: theme.rem(0, 1),
        },
        '@media (max-width: 768px)': {
            margin: theme.rem(0, 0, 0, 3),
        },

        '& svg': {
            height: theme.rem(1.4),
            width: theme.rem(1.4),

            '@media (max-width: 768px)': {
                height: theme.rem(2),
                width: theme.rem(2),
            },
        },
    },
}));

const OfferHead = (): ReactElement => {
    const css = useStyles();
    const offer = useSelector<IState, IOfferCard>(state => state.offers.single);

    return (
        <>
            <h1 className={css.title}>{offer?.title}</h1>
            <div className={css.action}>
                <p>Опубликовано: {offer?.pub_date}</p>
                <p className={css.eye}>
                    <FontAwesomeIcon icon={faEye} />
                    <span>{offer?.views}</span>
                </p>
                <button className={css.favorite} type="button">
                    {offer?.is_favorite ? <FontAwesomeIcon icon={faFillHeart} /> : <FontAwesomeIcon icon={faHeart} />}
                </button>
            </div>
        </>
    );
};

export default OfferHead;
