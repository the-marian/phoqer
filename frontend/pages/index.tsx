import React from 'react';
import { END } from 'redux-saga';
import types from '../redux/types';
import { wrapper } from '../redux/store';
import { IStore } from '../interfaces';
import Header from '../components/Header';

const Index = () => {
  return (
    <>
      <Header />
      <main className="main">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi ullam
        quis quaerat aliquid similique est esse, assumenda illo excepturi cumque
        dolore illum, in a deserunt nihil, id consequatur laboriosam animi?
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
