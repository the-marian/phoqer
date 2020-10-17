import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { END } from 'redux-saga';

import Container from '../../../components/common/Container';
import Main from '../../../components/common/Main';
import StepOne from '../../../components/NewOffer/StepOne';
import Stepper from '../../../components/NewOffer/Stepper';
import StepThree from '../../../components/NewOffer/StepThree';
import StepTwo from '../../../components/NewOffer/StepTwo';
import Success from '../../../components/NewOffer/Success';
import { Theme } from '../../../config/theme';
import { IStore } from '../../../interfaces';
import { wrapper } from '../../../redux/store';
import types from '../../../redux/types';

const useStyles = createUseStyles((theme: Theme) => ({
  title: {
    maxWidth: theme.rem(80),
    margin: '0 auto 5rem',
    textAlign: 'center',
    fontSize: theme.rem(3),
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    background: theme.palette.grad[2],
  },
}));

const STEPS = {
  1: <StepOne />,
  2: <StepTwo />,
  3: <StepThree />,
  done: <Success />,
};

const STEPS_TITLE = ['О товаре', 'Описание', 'Фото'];

const NewOffer = (): ReactElement => {
  const css = useStyles();
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>New product | Fucking project</title>
      </Head>
      <Main>
        <Container>
          <h1 className={css.title}>#Делитесь с другими и зарабатывайте</h1>

          <Stepper title={STEPS_TITLE} />

          {query.step !== undefined &&
            (STEPS[
              typeof query.step === 'string' ? query.step : query.step[0]
            ] ||
              STEPS['1'])}
        </Container>
      </Main>
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

interface Value {
  paths: Array<string | { params: { [key: string]: string } }>;
  fallback: boolean;
}

export const getStaticPaths = async (): Promise<Value> => ({
  paths: ['/new_offer/:step'],
  fallback: true,
});

export default NewOffer;
