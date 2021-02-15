import { HYDRATE } from 'next-redux-wrapper';

import { IOfferPaggination, IOfferState, IState } from '../../../interfaces';
import types from '../../types';
import { IAction } from './saga';

const search = (
    state: IOfferState = { data: { data: null, total: 0 }, loading: true },
    { type, payload }: IAction,
): IOfferState => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.search;

        case types.SEARCH_OFFERS_SUCCESS:
            return { data: payload as IOfferPaggination, loading: false };

        case types.SEARCH_OFFERS_START:
            return { ...state, loading: true };

        case types.SEARCH_OFFERS_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default search;
