import { HYDRATE } from 'next-redux-wrapper';

import { IOfferCard, IState } from '../../../interfaces';
import types from '../../types';
import IAction from './interfaces';

const single = (state: IOfferCard | null = null, { type, payload }: IAction): IOfferCard | null => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.single;

        case types.GET_SINGLE_OFFER_SUCCESS:
            return payload as IOfferCard;

        case types.GET_SINGLE_OFFER_ERROR:
            return null;

        case types.PATCH_FAVORITE_OFFERS_SUCCESS:
            return state?.id === payload ? { ...state, is_favorite: !state.is_favorite } : state;

        default:
            return state;
    }
};

export default single;
