import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import { IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';

const Index = (): ReactElement => {
  return (
    <main className="main">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nam
      perferendis consectetur voluptate rem natus asperiores cupiditate eligendi
      minima facilis? Eum at voluptates deserunt quaerat iure nulla soluta
      fugiat dignissimos.
    </main>
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
