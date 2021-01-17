import { INewOffer } from '../../interfaces';
import initState from '../state';
import types from '../types';

interface IAction {
    type: typeof types.SEARCH_FILTERS;
    payload: INewOffer;
}

const newOffer = (state: INewOffer = initState.newOffer, { type, payload }: IAction): INewOffer => {
    switch (type) {
        case types.NEW_OFFER_FORM:
            return { ...state, ...payload };

        default:
            return state;
    }
};

export default newOffer;
