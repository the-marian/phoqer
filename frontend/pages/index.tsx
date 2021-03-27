import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { END } from 'redux-saga';

import { Theme } from '../assets/theme';
import About from '../components/Common/About';
import Banner from '../components/Common/Banner';
import Categories from '../components/Common/Categories';
import Meta from '../components/Common/Meta';
import TopPopular from '../components/Common/PopularOffers';
import Search from '../components/Common/Search';
import Container from '../components/Layout/Container';
import PageLayout from '../components/Shared/PageLayout';
import useTrans from '../hooks/trans.hook';
import { IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';

const useStyles = createUseStyles((theme: Theme) => ({
    banner: {
        margin: theme.rem(8, 0),

        ...theme.media(550).max({
            margin: theme.rem(4, 0),
        }),
    },
}));

const Index = (): ReactElement => {
    const T = useTrans();
    const css = useStyles();
    return (
        <>
            <Meta title={T.home_page} />
            <PageLayout>
                <Container>
                    <Search />
                    <Categories />
                    <Banner className={css.banner} />
                    <TopPopular />
                </Container>

                <About />
            </PageLayout>
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
