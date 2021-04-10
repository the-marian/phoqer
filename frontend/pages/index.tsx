import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { END } from 'redux-saga';

import { Theme } from '../assets/theme';
import About from '../components/common/about';
import Banner from '../components/common/banner';
import Container from '../components/common/container';
import TopPopular from '../components/common/offers/popular-offers';
import Search from '../components/common/search';
import Meta from '../components/layout/meta';
import PageLayout from '../components/layout/page-layout';
import Categories from '../components/pages/home/categories';
import useTrans from '../hooks/trans.hook';
import { IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';

const useStyles = createUseStyles((theme: Theme) => ({
    banner: {
        background: theme.palette.soft[5],
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
