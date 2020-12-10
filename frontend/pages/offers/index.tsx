import Head from 'next/head';
import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import Search from '../../components/Common/Search';
import About from '../../components/Layout/About';
import Container from '../../components/Layout/Container';
import Main from '../../components/Layout/Main';
import Filters from '../../components/Pages/Offers/Filters';
import OffersList from '../../components/Pages/Offers/OffersList';
import TopOffers from '../../components/Pages/Offers/TopOffers';
import { IStore } from '../../interfaces';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';

const OffersPage = (): ReactElement => (
    <>
        <Head>
            <title>Search products | Fucking project</title>
        </Head>
        <Main>
            <Container>
                <Search />
                <Filters />
            </Container>

            <TopOffers />

            <Container>
                <OffersList />
            </Container>

            <About />
        </Main>
    </>
);

export const getStaticProps = wrapper.getStaticProps(
    async ({ store }: { store: IStore }): Promise<void> => {
        store.dispatch({ type: types.GET_CATEGORIES_START });
        store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
        store.dispatch(END);
        await store.sagaTask.toPromise();
    },
);

export default OffersPage;
