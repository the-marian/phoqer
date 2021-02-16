import Link from 'next/link';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import routes from '../../../../assets/routes';
import { Theme } from '../../../../assets/theme';
import { IOfferStatic, IState } from '../../../../interfaces';
import OffersList from '../../../Common/Offers/OffersList';
import SectionTitle from '../../../Layout/SectionTitle';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        marginTop: theme.rem(10),
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

const RelatedOffers = (): ReactElement => {
    const css = useStyles();
    const { data } = useSelector<IState, IOfferStatic>(state => state.offers.popular);

    return (
        <div className={css.root}>
            <SectionTitle link="Смотреть все" href={routes.offers.single(`?type=popular`)}>
                Похожие товары
            </SectionTitle>

            <OffersList data={data} />

            <Link href={routes.offers.list}>
                <a className={css.btn}>Смотреть все</a>
            </Link>
        </div>
    );
};

export default RelatedOffers;
