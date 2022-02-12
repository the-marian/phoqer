import React, { ReactElement } from 'react';

import { createUseStyles } from 'react-jss';
import { END } from 'redux-saga';

import api from '../api';
import About from '../components/common/about';
import Banner from '../components/common/advertising/banner';
import TopPopular from '../components/common/offers/popular-offers';
import Search from '../components/common/search';
import Container from '../components/layout/container';
import PageLayout from '../components/layout/page-layout';
import Meta from '../components/meta';
import Categories from '../components/pages/home/categories';
import useTrans from '../hooks/trans.hook';
import { IAuthResponse, IStore } from '../interfaces';
import { wrapper } from '../redux/store';
import types from '../redux/types';
import { parseCookie } from '../utils/helpers';
import { Theme } from '../utils/theming/theme';

const useStyles = createUseStyles((theme: Theme) => ({
    main: {
        paddingTop: 0,
    },
    banner: {
        margin: theme.rem(8, 0, 0),
        padding: theme.rem(20, 12),

        ...theme.media(767).max({
            padding: theme.rem(16, 4),
        }),
    },
}));

const Index = (): ReactElement => {
    const css = useStyles();
    const trans = useTrans();

    return (
        <>
            <Meta title={trans('home_page')} />
            <PageLayout className={css.main}>
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

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    const auth = parseCookie<IAuthResponse>(ctx.req.headers?.cookie);
    if (auth?.access_token) {
        api.defaults.headers.common.Authorization = auth.access_token;
        store.dispatch({ type: types.GET_USER_START });
    }

    store.dispatch({ type: types.GET_CATEGORIES_START });
    store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
    store.dispatch(END);
    await (store as IStore)?.sagaTask?.toPromise();

    return { props: {} };
});

export default Index;
