import { HYDRATE } from 'next-redux-wrapper';

import { INewOffer, IState } from '../../interfaces';
import initState from '../state';
import types from '../types';

interface IAction {
    type: typeof types.SEARCH_FILTERS | typeof types.POST_OFFER_SUCCESS;
    payload: INewOffer | IState;
}

const newOffer = (state: INewOffer = initState.newOffer, { type, payload }: IAction): INewOffer => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).newOffer;

        case types.POST_OFFER_SUCCESS:
            return { ...state, ...payload };

        case types.NEW_OFFER_FORM:
            return { ...state, ...payload };

        default:
            return state;
    }
};

export default newOffer;
