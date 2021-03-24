import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import About from '../../components/Common/About';
import Pagination from '../../components/Common/LoadMore/Pagination';
import Meta from '../../components/Common/Meta';
import OffersList from '../../components/Common/Offers/OffersList';
import Search from '../../components/Common/Search';
import SectionTitle from '../../components/Common/SectionTitle';
import Container from '../../components/Layout/Container';
import Filters from '../../components/Pages/Offers/Filters';
import TopOffers from '../../components/Pages/SingleOffer/TopOffers';
import Main from '../../components/Shared/TagMain';
import useTrans from '../../hooks/trans.hook';
import { IOfferDynamic, IState, IStore } from '../../interfaces';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';

const OffersPage = (): ReactElement => {
    const T = useTrans();
    const { query } = useRouter();
    const dispatch = useDispatch();
    const { data, loading, pagination } = useSelector<IState, IOfferDynamic>(state => state.offers.search);

    const handleClick = (page: number): void => {
        dispatch({ type: types.SEARCH_OFFERS_START, payload: { ...query, page } });
    };
    const handleMore = (page: number): void => {
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
                    <SectionTitle>Результаты поиска</SectionTitle>
                    <OffersList loading={loading} data={data?.data} />
                    <Pagination loading={pagination} total={data.total} onClick={handleClick} onMore={handleMore} />
                </Container>

                <About />
            </Main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        ctx?.store?.dispatch({ type: types.GET_CATEGORIES_START });
        ctx?.store?.dispatch({ type: types.GET_POPULAR_OFFERS_START });
        ctx?.store?.dispatch({ type: types.SEARCH_OFFERS_START, payload: ctx.query });
        ctx?.store?.dispatch(END);
        await (ctx.store as IStore)?.sagaTask?.toPromise();
    },
);

export default OffersPage;
