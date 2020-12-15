import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import TopPopular from '../components/Common/Offers/PopularOffersWrap';
import Search from '../components/Common/Search';
import About from '../components/Layout/About';
import Banner from '../components/Layout/Banner';
import Container from '../components/Layout/Container';
import Main from '../components/Layout/Main';
import Categories from '../components/Pages/Home/Categories';
import { IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';

const Index = (): ReactElement => (
    <Main>
        <Container>
            <Search />
            <Categories />
            <Banner />
            <TopPopular />
        </Container>

        <About />
    </Main>
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
