import { IOfferCard, IOfferPopular } from '../../../interfaces';
import types from '../../types';

interface IAction {
    type: typeof types.GET_POPULAR_OFFERS_START | typeof types.GET_POPULAR_OFFERS_ERROR | typeof types.GET_POPULAR_OFFERS_SUCCESS;
    payload: IOfferCard[] | null;
}

const popular = (state: IOfferPopular = { data: null, loading: true }, { type, payload }: IAction): IOfferPopular => {
    switch (type) {
        case types.GET_POPULAR_OFFERS_SUCCESS:
            return { data: payload, loading: false };

        case types.GET_POPULAR_OFFERS_START:
            return { ...state, loading: true };

        case types.GET_POPULAR_OFFERS_ERROR:
            return { ...state, loading: false };

        default:
            return state;
    }
};

export default popular;
