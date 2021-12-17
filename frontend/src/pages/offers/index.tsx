import React, { ReactElement, useCallback, useEffect, useRef } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import About from '../../components/common/about';
import Pagination from '../../components/common/load-more/pagination';
import OffersList from '../../components/common/offers/offers-list';
import Search from '../../components/common/search';
import SectionTitle from '../../components/common/section-title';
import Container from '../../components/layout/container';
import PageLayout from '../../components/layout/page-layout';
import Meta from '../../components/meta';
import Filters from '../../components/pages/offers/filters';
import ActiveFilters from '../../components/pages/offers/filters/active-filters';
import TopOffers from '../../components/pages/offers/top-offers';
import useTrans from '../../hooks/trans.hook';
import { IAuthResponse, ICategories, IOfferDynamic, IState, IStore } from '../../interfaces';
import initState from '../../redux/state';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';
import { findCategory, findSubCategory, parseCookie } from '../../utils/helpers';
import api from '../../utils/interceptors';

const OffersPage = (): ReactElement => {
    const { query } = useRouter();
    const scroll = useRef(true);
    const trans = useTrans();
    const dispatch = useDispatch();
    const category = String(query?.category || '');

    const { data, loading, pagination } = useSelector<IState, IOfferDynamic>(state => state.offers.search);
    const categories = useSelector<IState, ICategories[]>(state => state.categories);
    const icon =
        (findCategory(categories, category) as ICategories)?.image ||
        (findSubCategory(categories, category) as ICategories)?.image ||
        null;

    useEffect(() => {
        const top = document?.getElementById('offers-list')?.offsetTop || 0;
        if (scroll.current) {
            window.scrollTo({ top, behavior: 'smooth' });
        } else {
            scroll.current = true;
        }
    }, [data]);

    useEffect(() => {
        dispatch({ type: types.GET_CATEGORIES_START });
    }, [dispatch]);

    const handleClick = useCallback(
        (page: number): void => {
            window.scrollTo({ top: (document?.getElementById('offers-list')?.offsetTop || 0) - 50, behavior: 'smooth' });
            dispatch({ type: types.SEARCH_OFFERS_START, payload: { ...query, page } });
        },
        [dispatch, query],
    );
    const handleMore = useCallback(
        (page: number): void => {
            const top =
                (document?.getElementById('offers-list')?.offsetTop || 0) +
                (document?.getElementById('offers-list')?.offsetHeight || 0) -
                500;
            dispatch({ type: types.SEARCH_OFFERS_PAGINATION_START, payload: { ...query, page } });
            scroll.current = false;
            window.scrollTo({ top, behavior: 'smooth' });
        },
        [dispatch, query],
    );

    return (
        <>
            <Meta title={trans('search_offers')} h1={trans('search_offers')} icon={icon} />
            <PageLayout>
                <Search shallow />

                <Container>
                    <Filters />
                </Container>

                <ActiveFilters />
                <TopOffers />

                <Container id="offers-list">
                    <SectionTitle>{trans('searching_results')}</SectionTitle>
                    <OffersList loading={pagination} loadMoreLoading={loading} data={data?.data} />
                    <Pagination loading={pagination} total={data.total} onClick={handleClick} onMore={handleMore} />
                </Container>

                <About />
            </PageLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    const auth = parseCookie<IAuthResponse>(ctx.req.headers?.cookie);
    if (auth?.access_token) {
        api.defaults.headers.common.Authorization = auth.access_token;
        store.dispatch({ type: types.GET_USER_START });
    }

    // OFFERS
    store.dispatch({ type: types.GET_POPULAR_SEARCHES_START });
    store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
    store.dispatch({
        type: types.OFFERS_SEARCH_LOCAL_PARAMS,
        payload: { ...initState.config.searchParams, ...ctx.query },
    });
    store.dispatch({ type: types.SEARCH_OFFERS_START, payload: ctx.query });

    // GENERAL
    store.dispatch(END);
    await (store as IStore)?.sagaTask?.toPromise();

    return { props: {} };
});

export default OffersPage;
