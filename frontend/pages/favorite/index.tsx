import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import OffersList from '../../components/common/offers/offers-list';
import SectionTitle from '../../components/common/section-title';
import Container from '../../components/layout/container';
import Meta from '../../components/layout/meta';
import PageLayout from '../../components/layout/page-layout';
import useTrans from '../../hooks/trans.hook';
import { IOfferStatic, IState, IStore } from '../../interfaces';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';

const Favorite = (): ReactElement => {
    const trans = useTrans();
    const { data } = useSelector<IState, IOfferStatic>(state => state.offers.favorite);

    return (
        <>
            <Meta title={trans('favorite_offer')} h1={trans('favorite_offer')} />
            <PageLayout>
                <Container>
                    <SectionTitle>{trans('favorite_offer')}</SectionTitle>
                    <OffersList data={data} />
                </Container>
            </PageLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async (ctx): Promise<void> => {
        ctx.store.dispatch({ type: types.GET_FAVORITE_OFFERS_START });
        ctx.store.dispatch(END);
        await (ctx.store as IStore)?.sagaTask?.toPromise();
    },
);

export default Favorite;
