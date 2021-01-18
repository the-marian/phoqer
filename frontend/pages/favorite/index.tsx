import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import Meta from '../../components/Common/Meta';
import OffersList from '../../components/Common/Offers/OffersList';
import Container from '../../components/Layout/Container';
import Main from '../../components/Layout/Main';
import SectionTitle from '../../components/Layout/SectionTitle';
import { IOfferPopular, IState, IStore } from '../../interfaces';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';

const Favorite = (): ReactElement => {
    const { data, loading } = useSelector<IState, IOfferPopular>(state => state.offers.popular);
    return (
        <>
            <Meta />
            <Main>
                <Container>
                    <SectionTitle>Избранные предложения</SectionTitle>
                    <OffersList data={data} loading={loading} />
                </Container>
            </Main>
        </>
    );
};

export const getStaticProps = wrapper.getStaticProps(
    async ({ store }: { store: IStore }): Promise<void> => {
        store.dispatch({ type: types.GET_POPULAR_OFFERS_START });
        store.dispatch(END);
        await store.sagaTask.toPromise();
    },
);

export default Favorite;
