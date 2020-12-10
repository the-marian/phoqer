import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { Theme } from '../../../../assets/theme';
import { IOfferPopular, IState } from '../../../../interfaces';
import OfferCard from '../../../Common/OfferCard';
import OffersLoader from '../../../Common/Preloaders/OffersLoader';
import SectionTitle from '../../../Layout/SectionTitle';

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
    const { data, loading } = useSelector<IState, IOfferPopular>(state => state.offers.popular);

    return (
        <div className={css.root}>
            <SectionTitle link="Смотреть все" href="/offers?type=popular">
                Популярные товары
            </SectionTitle>

            <div className={css.grid}>
                <OffersLoader loading={loading} isEmpty={!data?.length}>
                    {data?.map(product => (
                        <OfferCard key={product.id} product={product} />
                    ))}
                </OffersLoader>
            </div>

            <Link href="/offers">
                <a className={css.btn}>Смотреть все</a>
            </Link>
        </div>
    );
};

export default TopPopular;
