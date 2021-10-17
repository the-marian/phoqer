import { HYDRATE } from 'next-redux-wrapper';

import { INewOffer, IState } from '../../../interfaces';
import offersInit from '../init-state';
import types from '../types';

import IAction from './interfaces';

const new_offer = (state: INewOffer = offersInit.new_offer, { type, payload }: IAction): INewOffer => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.new_offer;

        case types.POST_OFFER_START:
            return { ...state, loading: true };

        case types.POST_OFFER_ERROR:
            return { ...state, loading: false };

        case types.NEW_OFFER_FORM:
            return { ...state, ...(payload as INewOffer) };

        default:
            return state;
    }
};

export default new_offer;
