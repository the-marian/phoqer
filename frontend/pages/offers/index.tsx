import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import { findCategory, findSubCategory } from '../../assets/helpers';
import About from '../../components/common/about';
import Pagination from '../../components/common/load-more/pagination';
import OffersList from '../../components/common/offers/offers-list';
import Search from '../../components/common/search';
import SectionTitle from '../../components/common/section-title';
import Container from '../../components/layout/container';
import Meta from '../../components/layout/meta';
import PageLayout from '../../components/layout/page-layout';
import Filters from '../../components/pages/offers/filters';
import ActiveFilters from '../../components/pages/offers/filters/active-filters';
import TopOffers from '../../components/pages/offers/top-offers';
import useTrans from '../../hooks/trans.hook';
import { ICategories, IOfferDynamic, IState, IStore } from '../../interfaces';
import initState from '../../redux/state';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';

const OffersPage = (): ReactElement => {
    const { query } = useRouter();
    const trans = useTrans();
    const dispatch = useDispatch();
    const category = String(query.category || '');

    const { data, loading, pagination } = useSelector<IState, IOfferDynamic>(state => state.offers.search);
    const categories = useSelector<IState, ICategories[]>(state => state.categories);
    const icon =
        (findCategory(categories, category) as ICategories)?.image ||
        (findSubCategory(categories, category) as ICategories)?.image ||
        null;

    const handleClick = (page: number): void => {
        dispatch({ type: types.SEARCH_OFFERS_START, payload: { ...query, page } });
    };
    const handleMore = (page: number): void => {
        dispatch({ type: types.SEARCH_OFFERS_PAGINATION_START, payload: { ...query, page } });
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

                <Container>
                    <SectionTitle>{trans('searching_results')}</SectionTitle>
                    <OffersList loading={loading} data={data?.data} />
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
