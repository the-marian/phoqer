import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
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
import Filters from '../../components/per-pages/offers/filters';
import ActiveFilters from '../../components/per-pages/offers/filters/active-filters';
import TopOffers from '../../components/per-pages/offers/top-offers';
import useTrans from '../../hooks/trans.hook';
import { ICategories, IOfferDynamic, IState, IStore } from '../../interfaces';
import initState from '../../redux/state';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';
import { findCategory, findSubCategory } from '../../utils/helpers';

const OffersPage = (): ReactElement => {
    const { query } = useRouter();
    const trans = useTrans();
    const dispatch = useDispatch();
    const category = String(query?.category || '');

    const { data, loading, pagination } = useSelector<IState, IOfferDynamic>(state => state.offers.search);
    const categories = useSelector<IState, ICategories[]>(state => state.categories);
    const icon =
        (findCategory(categories, category) as ICategories)?.image ||
        (findSubCategory(categories, category) as ICategories)?.image ||
        null;

    const handleClick = (page: number): void => {
        window.scrollTo({ top: (document?.getElementById('offers-list')?.offsetTop || 0) - 50, behavior: 'smooth' });
        dispatch({ type: types.SEARCH_OFFERS_START, payload: { ...query, page } });
    };
    const handleMore = (page: number): void => {
        const top =
            (document?.getElementById('offers-list')?.offsetTop || 0) +
            (document?.getElementById('offers-list')?.offsetHeight || 0) -
            500;
        dispatch({ type: types.SEARCH_OFFERS_PAGINATION_START, payload: { ...query, page } });
        window.scrollTo({ top, behavior: 'smooth' });
    };

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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx): Promise<void> => {
    // CATEGORIES
    ctx?.store?.dispatch({ type: types.GET_CATEGORIES_START });
    // OFFERS
    ctx?.store?.dispatch({ type: types.GET_POPULAR_OFFERS_START });
    ctx?.store?.dispatch({
        type: types.OFFERS_SEARCH_LOCAL_PARAMS,
        payload: { ...initState.config.searchParams, ...ctx.query },
    });
    ctx?.store?.dispatch({ type: types.SEARCH_OFFERS_START, payload: ctx.query });
    // GENERAL
    ctx?.store?.dispatch(END);
    await (ctx.store as IStore)?.sagaTask?.toPromise();
});

export default OffersPage;
