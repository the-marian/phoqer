import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import router from '../../../../assets/router';
import { Theme } from '../../../../assets/theme';
import { IOfferPopular, IState } from '../../../../interfaces';
import SectionTitle from '../../../Layout/SectionTitle';
import OffersList from '../OffersList';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],
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
            <SectionTitle link="Смотреть все" href={`${router.offers}?type=popular`}>
                Популярные товары
            </SectionTitle>

            <OffersList data={data} loading={loading} />

            <Link href={router.offers}>
                <a className={css.btn}>Смотреть все</a>
            </Link>
        </div>
    );
};

export default TopPopular;
