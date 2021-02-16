import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import OffersLoadMore from '../../components/Common/LoadMore/Offers';
import Meta from '../../components/Common/Meta';
import OffersList from '../../components/Common/Offers/OffersList';
import Search from '../../components/Common/Search';
import About from '../../components/Layout/About';
import Container from '../../components/Layout/Container';
import Main from '../../components/Layout/Main';
import Filters from '../../components/Pages/Offers/Filters';
import TopOffers from '../../components/Pages/Offers/TopOffers';
import useTrans from '../../hooks/trans.hook';
import { IOfferDynamic, IState, IStore } from '../../interfaces';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';

const OffersPage = (): ReactElement => {
    const T = useTrans();
    const { query } = useRouter();
    const dispatch = useDispatch();
    const { data, loading } = useSelector<IState, IOfferDynamic>(state => state.offers.search);

    const handleLoadMore = (page: number): void => {
        dispatch({ type: types.SEARCH_OFFERS_PAGINATION_START, payload: { ...query, page } });
    };

    return (
        <>
            <Meta title={T.search_offers} h1={T.search_offers} />
            <Main>
                <Container>
                    <Search />
                    <Filters />
                </Container>

                <TopOffers />

                <Container>
                    <OffersList data={data?.data} />
                    <OffersLoadMore loading={loading} total={data?.total || 0} onSubmit={handleLoadMore} />
                </Container>

                <About />
            </Main>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx: GetServerSidePropsContext & { store: IStore }): Promise<void> => {
        ctx.store.dispatch({ type: types.GET_CATEGORIES_START });
        ctx.store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
        ctx.store.dispatch({ type: types.SEARCH_OFFERS_START, payload: ctx.query });
        ctx.store.dispatch(END);
        await ctx.store.sagaTask.toPromise();
    },
);

export default OffersPage;
