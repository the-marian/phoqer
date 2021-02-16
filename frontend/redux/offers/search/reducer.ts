import { HYDRATE } from 'next-redux-wrapper';

import { IOfferDynamic, IOfferPaggination, IState } from '../../../interfaces';
import types from '../../types';
import { IAction } from './saga';

const search = (
    state: IOfferDynamic = { data: { data: null, total: 0 }, loading: true },
    { type, payload }: IAction,
): IOfferDynamic => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.search;

        case types.SEARCH_OFFERS_PAGINATION_SUCCESS:
            return {
                data: { ...state.data, data: [...state.data.data, ...(payload as IOfferPaggination).data] },
                loading: false,
            };

        case types.SEARCH_OFFERS_SUCCESS:
            return { data: payload as IOfferPaggination, loading: false };

        case types.SEARCH_OFFERS_START:
        case types.SEARCH_OFFERS_PAGINATION_START:
            return { ...state, loading: true };

        case types.SEARCH_OFFERS_ERROR:
        case types.SEARCH_OFFERS_PAGINATION_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default search;
