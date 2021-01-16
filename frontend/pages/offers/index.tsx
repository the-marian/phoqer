import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import Meta from '../../components/Common/Meta';
import OffersList from '../../components/Common/Offers/OffersList';
import Search from '../../components/Common/Search';
import About from '../../components/Layout/About';
import Container from '../../components/Layout/Container';
import Main from '../../components/Layout/Main';
import Filters from '../../components/Pages/Offers/Filters';
import TopOffers from '../../components/Pages/Offers/TopOffers';
import { IOfferPopular, IState, IStore } from '../../interfaces';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';

const OffersPage = (): ReactElement => {
    const { data, loading } = useSelector<IState, IOfferPopular>(state => state.offers.popular);
    return (
        <>
            <Meta />
            <Main>
                <Container>
                    <Search />
                    <Filters />
                </Container>

                <TopOffers />

                <Container>
                    <OffersList data={data} loading={loading} />
                </Container>

                <About />
            </Main>
        </>
    );
};

export const getStaticProps = wrapper.getStaticProps(
    async ({ store }: { store: IStore }): Promise<void> => {
        store.dispatch({ type: types.GET_CATEGORIES_START });
        store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
        store.dispatch(END);
        await store.sagaTask.toPromise();
    },
);

export default OffersPage;
