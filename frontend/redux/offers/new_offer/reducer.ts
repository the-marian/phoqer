import { HYDRATE } from 'next-redux-wrapper';

import { INewOffer, IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction from './interfaces';

const new_offer = (state: INewOffer = initState.offers.new_offer, { type, payload }: IAction): INewOffer => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.new_offer;

        case types.POST_OFFER_START:
        case types.PATCH_OFFER_START:
        case types.PATCH_OFFER_STATUS_START:
            return { ...state, loading: true };

        case types.POST_OFFER_ERROR:
            return { ...state, loading: false };

        case types.POST_OFFER_SUCCESS:
            return { ...state, id: (payload as INewOffer).id, loading: false };

        case types.PATCH_OFFER_SUCCESS:
        case types.PATCH_OFFER_STATUS_SUCCESS:
        case types.PATCH_OFFER_ERROR:
        case types.PATCH_OFFER_STATUS_ERROR:
            return { ...state, loading: false };

        case types.NEW_OFFER_FORM:
            return { ...state, ...payload };

        default:
            return state;
    }
};

export default new_offer;
