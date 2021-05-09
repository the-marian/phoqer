import { HYDRATE } from 'next-redux-wrapper';

import { IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction, { IValue } from './interfaces';

const edit_offer = (state: IValue = initState.offers.edit_offer, { type, payload }: IAction): IValue => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.edit_offer;

        case types.PATCH_OFFER_START:
        case types.PATCH_EDIT_OFFER_STATUS_START:
            return { loading: true };

        case types.PATCH_OFFER_SUCCESS:
        case types.PATCH_EDIT_OFFER_STATUS_SUCCESS:
        case types.PATCH_OFFER_ERROR:
        case types.PATCH_EDIT_OFFER_STATUS_ERROR:
            return { loading: false };

        default:
            return state;
    }
};

export default edit_offer;
