import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import useTrans from '../../../hooks/trans.hook';
import { IOfferStatic, IState } from '../../../interfaces';
import types from '../../../redux/types';
import OffersList from '../../common/offers/offers-list';
import SectionTitle from '../../common/section-title';
import Container from '../../layout/container';

const FavoriteContent = (): JSX.Element => {
    const trans = useTrans();
    const dispatch = useDispatch();

    const { data } = useSelector<IState, IOfferStatic>(state => state.offers.favorite);

    useEffect(() => {
        dispatch({ type: types.GET_FAVORITE_OFFERS_START });
    }, [dispatch]);

    return (
        <Container>
            <SectionTitle>{trans('favorite_offer')}</SectionTitle>
            <OffersList data={data} />
        </Container>
    );
};

export default FavoriteContent;
