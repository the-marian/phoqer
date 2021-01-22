import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import Meta from '../components/Common/Meta';
import Search from '../components/Common/Search';
import About from '../components/Layout/About';
import Container from '../components/Layout/Container';
import Main from '../components/Layout/Main';
import Banner from '../components/Pages/Home/Banner';
import Categories from '../components/Pages/Home/Categories';
import TopPopular from '../components/Pages/Home/PopularOffers';
import { IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';

const Index = (): ReactElement => (
    <>
        <Meta title='Home page' />
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

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store }: { store: IStore }): Promise<void> => {
        store.dispatch({ type: types.GET_CATEGORIES_START });
        store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
        store.dispatch(END);
        await store.sagaTask.toPromise();
    },
);

export default Index;
