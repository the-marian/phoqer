import { HYDRATE } from 'next-redux-wrapper';

import { IOfferCard, IState } from '../../../interfaces';
import types from '../../types';

export interface IAction {
    type: typeof types.GET_SINGLE_OFFER_START | typeof types.GET_SINGLE_OFFER_SUCCESS | typeof types.GET_SINGLE_OFFER_ERROR;
    payload: string | IState | IOfferCard | null;
}

const single = (state: IOfferCard | null = null, { type, payload }: IAction): IOfferCard | null => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.single;

        case types.GET_SINGLE_OFFER_SUCCESS:
            return payload as IOfferCard;

        case types.GET_SINGLE_OFFER_ERROR:
            return null;

        default:
            return state;
    }
};

export default single;
