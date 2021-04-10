import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import Container from '../../components/common/container';
import OffersList from '../../components/common/offers/offers-list';
import SectionTitle from '../../components/common/section-title';
import Meta from '../../components/layout/meta';
import PageLayout from '../../components/layout/page-layout';
import useTrans from '../../hooks/trans.hook';
import { IOfferStatic, IState, IStore } from '../../interfaces';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';

const Favorite = (): ReactElement => {
    const T = useTrans();
    const { data } = useSelector<IState, IOfferStatic>(state => state.offers.favorite);

    return (
        <>
            <Meta title={T.favorite_offer} h1={T.favorite_offer} />
            <PageLayout>
                <Container>
                    <SectionTitle>{T.favorite_offer}</SectionTitle>
                    <OffersList data={data} />
                </Container>
            </PageLayout>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    async ({ store }: { store: IStore }): Promise<void> => {
        store.dispatch({ type: types.GET_FAVORITE_OFFERS_START });
        store.dispatch(END);
        await store?.sagaTask?.toPromise();
    },
);

export default Favorite;
