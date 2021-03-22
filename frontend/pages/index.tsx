import React, { ReactElement } from 'react';
import { END } from 'redux-saga';

import About from '../components/Common/About';
import Banner from '../components/Common/Banner';
import Categories from '../components/Common/Categories';
import Meta from '../components/Common/Meta';
import TopPopular from '../components/Common/PopularOffers';
import Search from '../components/Common/Search';
import Container from '../components/Layout/Container';
import Main from '../components/Layout/TagMain';
import useTrans from '../hooks/trans.hook';
import { IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';

const Index = (): ReactElement => {
    const T = useTrans();
    return (
        <>
            <Meta title={T.home_page} />
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
};

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store }: { store: IStore }): Promise<void> => {
        store.dispatch({ type: types.GET_CATEGORIES_START });
        store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
        store.dispatch(END);
        await store?.sagaTask?.toPromise();
    },
);

export default Index;
