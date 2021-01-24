import { HYDRATE } from 'next-redux-wrapper';

import { INewOffer, IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';

interface IAction {
    type: typeof types.NEW_OFFER_FORM | typeof types.POST_OFFER_SUCCESS;
    payload: INewOffer | IState;
}

const newOffer = (state: INewOffer = initState.offers.newOffer, { type, payload }: IAction): INewOffer => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.newOffer;

        case types.POST_OFFER_SUCCESS:
            return { ...state, id: (payload as INewOffer).id };

        case types.NEW_OFFER_FORM:
            return { ...state, ...payload };

        default:
            return state;
    }
};

export default newOffer;
