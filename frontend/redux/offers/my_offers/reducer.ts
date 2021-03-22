import { HYDRATE } from 'next-redux-wrapper';

import { IOfferDynamic, IOfferPagination, IState } from '../../../interfaces';
import types from '../../types';
import IAction from './interfaces';

const my_offers = (
    state: IOfferDynamic = { data: { data: [], total: 0 }, loading: true },
    { type, payload }: IAction,
): IOfferDynamic => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.my_offers;

        case types.MY_OFFERS_PAGINATION_SUCCESS:
            return {
                data: { ...state.data, data: [...state.data.data, ...(payload as IOfferPagination).data] },
                loading: false,
            };

        case types.MY_OFFERS_SUCCESS:
            return { data: payload as IOfferPagination, loading: false };

        case types.MY_OFFERS_START:
        case types.MY_OFFERS_PAGINATION_START:
            return { ...state, loading: true };

        case types.MY_OFFERS_ERROR:
        case types.MY_OFFERS_PAGINATION_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default my_offers;
