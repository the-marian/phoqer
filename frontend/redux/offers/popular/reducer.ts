import { HYDRATE } from 'next-redux-wrapper';

import { IOfferCard, IOfferStatic, IState } from '../../../interfaces';
import types from '../../types';

interface IAction {
    type: typeof types.GET_POPULAR_OFFERS_START | typeof types.GET_POPULAR_OFFERS_ERROR | typeof types.GET_POPULAR_OFFERS_SUCCESS;
    payload: IOfferCard[] | IState | null;
}

const popular = (state: IOfferStatic = { data: [], loading: true }, { type, payload }: IAction): IOfferStatic => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.popular;

        case types.GET_POPULAR_OFFERS_SUCCESS:
            return { data: payload as IOfferCard[], loading: false };

        case types.GET_POPULAR_OFFERS_START:
            return { ...state, loading: true };

        case types.GET_POPULAR_OFFERS_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default popular;
