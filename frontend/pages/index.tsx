import Head from 'next/head';
import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import Banner from '../components/Banner';
import Categories from '../components/Categories';
import Container from '../components/common/Container';
import DropDown from '../components/common/DropDown';
import Main from '../components/common/Main';
import Search from '../components/common/Search';
import { IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';

const LIST: { name: string }[] = [
  { name: '1Ldsfds sddsdsdf' },
  { name: '2LKsdfvs sddsdssd df' },
  { name: '3Usd tinjio iojkjn' },
  { name: '4Ojk ojdfkkn ff' },
  { name: '5Sdoijlk' },
  { name: '6Ldsfds sddsdsdf' },
  { name: '7LKsdfvs sddsdssd df' },
  { name: '8Usd tinjio iojkjn' },
  { name: '9Ojk ojdfkkn ff' },
  { name: '10Sdoijlk' },
];

const Index = (): ReactElement => (
  <>
    <Head>
      <title>Fucking project</title>
    </Head>
    <Main>
      <Container>
        <Search />
        <DropDown value={LIST} onSubmit={console.log} />
        <Banner />
        <Categories />
      </Container>
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

export default Index;
