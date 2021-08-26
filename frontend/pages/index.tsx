import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { END } from 'redux-saga';

import About from '../components/common/about';
import Banner from '../components/common/advertising/banner';
import TopPopular from '../components/common/offers/popular-offers';
import Search from '../components/common/search';
import Container from '../components/layout/container';
import PageLayout from '../components/layout/page-layout';
import Meta from '../components/meta';
import Categories from '../components/per-pages/home/categories';
import useTrans from '../hooks/trans.hook';
import { IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';
import { Theme } from '../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    banner: {
        margin: theme.rem(8, 0),
        padding: theme.rem(20, 12),

        ...theme.media(767).max({
            padding: theme.rem(16, 4),
            margin: theme.rem(4, 0),
        }),
    },
}));

const Index = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    return (
        <>
            <Meta title={trans('home_page')} />
            <PageLayout>
                <Search />
                <Container>
                    <Categories />
                    <TopPopular />
                    <Banner className={css.banner} />
                </Container>

                <About />
            </PageLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx): Promise<void> => {
    ctx.store.dispatch({ type: types.GET_CATEGORIES_START });
    ctx.store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
    ctx.store.dispatch(END);
    await (ctx.store as IStore)?.sagaTask?.toPromise();
});

export default Index;
