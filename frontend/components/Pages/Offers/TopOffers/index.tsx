import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../../config/theme';
import { IOfferPopular, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import OfferCard from '../../../Base/OfferCard';
import OffersLoader from '../../../Base/Preloaders/OffersLoader';
import Container from '../../../Layout/Container';
import SectionTitle from '../../../Layout/SectionTitle';

const useStyles = createUseStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.rem(8),
        padding: theme.rem(5, 0, 8),
        background: theme.palette.gray[0],
        fontSize: theme.rem(1.5),
        fontWeight: theme.text.weight[3],

        '@media (max-width: 800px)': {
            marginBottom: theme.rem(5),
            padding: theme.rem(5, 0),
        },
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
}));

const TopProducts = (): ReactElement => {
    const css = useStyles();
    const dispatch = useDispatch();
    const { data, loading } = useSelector<IState, IOfferPopular>(state => state.offers.popular);

    useEffect(() => {
        dispatch({ type: types.GET_POPULAR_OFFERS_START });
    }, [dispatch]);

    return (
        <div className={css.root}>
            <Container>
                <SectionTitle link="Смотреть все" href="/offers?type=popular">
                    TOП Объявления
                </SectionTitle>

                <div className={css.grid}>
                    {loading ? (
                        <OffersLoader />
                    ) : (
                        !!data && data.map(product => <OfferCard key={product.id} {...product} />)
                    )}
                </div>
            </Container>
        </div>
    );
};

export default TopProducts;
