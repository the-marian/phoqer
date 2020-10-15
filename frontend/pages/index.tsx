import Head from 'next/head';
import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import Banner from '../components/Banner';
import Categories from '../components/Categories';
import About from '../components/common/About';
import Container from '../components/common/Container';
import Main from '../components/common/Main';
import Search from '../components/common/Search';
import TopPopular from '../components/Offers/TopPopular';
import { IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';

const Index = (): ReactElement => (
  <>
    <Head>
      <title>Fucking project</title>
    </Head>
    <Main>
      <Container>
        <Search />
        <Categories />
        <Banner />
        <TopPopular />
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

export default Index;
