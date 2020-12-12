import React, { ReactElement, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { Theme } from '../../../../assets/theme';
import { IOfferPopular, IState } from '../../../../interfaces';
import types from '../../../../redux/types';
import Container from '../../../Layout/Container';
import SectionTitle from '../../../Layout/SectionTitle';
import OffersList from '../OffersList';

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

                <OffersList data={data} loading={loading} />
            </Container>
        </div>
    );
};

export default TopProducts;
