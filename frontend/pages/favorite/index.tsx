import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import OffersList from '../../components/Common/Offers/OffersList';
import SectionTitle from '../../components/Common/SectionTitle';
import Container from '../../components/Layout/Container';
import Main from '../../components/Layout/Main';
import { IOfferPopular, IState, IStore } from '../../interfaces';
import { wrapper } from '../../redux/store';
import types from '../../redux/types';

const Favorite = (): ReactElement => {
    const { data, loading } = useSelector<IState, IOfferPopular>(state => state.offers.popular);
    return (
        <Main>
            <Container>
                <SectionTitle>Избранные предложения</SectionTitle>
                <OffersList data={data} loading={loading} />
            </Container>
        </Main>
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
