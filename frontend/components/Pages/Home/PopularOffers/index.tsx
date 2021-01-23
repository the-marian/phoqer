import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import useTrans from '../../../../hooks/trans.hook';
import { IOfferPopular, IState } from '../../../../interfaces';
import OffersList from '../../../Common/Offers/OffersList';
import SectionTitle from '../../../Layout/SectionTitle';

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
        background: theme.palette.primary[0],

        '@media (max-width: 550px)': {
            margin: '4rem auto 0',
        },
    },
}));

const PopularOffers = (): ReactElement => {
    const css = useStyles();
    const T = useTrans();
    const { data, loading } = useSelector<IState, IOfferPopular>(state => state.offers.popular);

    return (
        <div className={css.root}>
            <SectionTitle link={T.see_all} href={routes.offers.single(`?type=popular`)}>
                {T.popular_offers}
            </SectionTitle>

            <OffersList data={data} loading={loading} />

            <Link href={routes.offers.list}>
                <a className={css.btn}>{T.see_all}</a>
            </Link>
        </div>
    );
};

export default PopularOffers;
