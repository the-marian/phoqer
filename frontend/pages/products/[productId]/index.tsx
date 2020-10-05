import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import Container from '../../../components/common/Container';
import Main from '../../../components/common/Main';
import Search from '../../../components/common/Search';
import { IStore } from '../../../interfaces';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';

const SingleProduct = (): ReactElement => (
  <Main>
    <Container>
      <Search />
    </Container>
  </Main>
);

export const getStaticProps = wrapper.getStaticProps(
  async ({ store }: { store: IStore }): Promise<void> => {
    store.dispatch({ type: types.GET_CATEGORIES_START });
    store.dispatch(END);
    await store.sagaTask.toPromise();
  },
);

interface Value {
  paths: Array<string | { params: { [key: string]: string } }>;
  fallback: boolean;
}

export const getStaticPaths = async (): Promise<Value> => ({
  paths: ['/products/2'],
  fallback: true,
});

export default SingleProduct;
