import Head from 'next/head';
import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import About from '../../components/common/About';
import Container from '../../components/common/Container';
import Main from '../../components/common/Main';
import Search from '../../components/common/Search';
import Filters from '../../components/Filters';
import OffersList from '../../components/Offers/OffersList';
import TopOffers from '../../components/Offers/TopOffers';
import { IStore } from '../../interfaces';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';

const OffersPage = (): ReactElement => (
  <>
    <Head>
      <title>Search roducts | Fucking project</title>
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
    store.dispatch(END);
    await store.sagaTask.toPromise();
  },
);

export default OffersPage;
