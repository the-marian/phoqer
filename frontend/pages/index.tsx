import Head from 'next/head';
import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import Categories from '../components/Categories';
import Container from '../components/common/Container';
import Search from '../components/common/Search';
import { IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';

const Index = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Fucking project</title>
      </Head>
      <main className="main">
        <Container>
          <Search />
          <Categories />
        </Container>
      </main>
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store }: { store: IStore }): Promise<void> => {
    store.dispatch({ type: types.GET_CATEGORIES_START });
    store.dispatch(END);
    await store.sagaTask.toPromise();
  },
);

export default Index;
