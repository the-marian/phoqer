import { HYDRATE } from 'next-redux-wrapper';

import { IOfferDynamic, IOfferPagination, IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction from './interfaces';

const my_offers = (state: IOfferDynamic = initState.offers.my_offers, { type, payload }: IAction): IOfferDynamic => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.my_offers;

        case types.MY_OFFERS_PAGINATION_SUCCESS:
            return {
                data: { ...state.data, data: [...state.data.data, ...(payload as IOfferPagination).data] },
                loading: false,
                pagination: false,
            };

        case types.MY_OFFERS_SUCCESS:
            return { data: payload as IOfferPagination, loading: false, pagination: false };

        case types.MY_OFFERS_START:
            return { ...state, loading: true };
        case types.MY_OFFERS_PAGINATION_START:
            return { ...state, pagination: true };

        case types.MY_OFFERS_ERROR:
        case types.MY_OFFERS_PAGINATION_ERROR:
            return { ...state, loading: false, pagination: false };

        default:
            return state;
    }
};

export default my_offers;
