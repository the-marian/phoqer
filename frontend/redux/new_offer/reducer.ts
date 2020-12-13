import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { encryptor } from '../../assets/encryptor';
import { INewOffer, IStepOne, IStepTwo } from '../../interfaces';
import initState from '../state';
import types from '../types';

interface IAction {
    type: typeof types.SEARCH_FILTERS;
    payload: IStepOne | IStepTwo | INewOffer;
}

const newOffer = (state: INewOffer = initState.newOffer, { type, payload }: IAction): INewOffer => {
    switch (type) {
        case types.NEW_OFFER_FORM:
            return { ...state, ...payload };

        default:
            return state;
    }
};

const config = {
    storage,
    key: 'phoqer_new_offer',
    white: ['newOffer'],
    transforms: [encryptor],
};

export default persistReducer(config, newOffer);
