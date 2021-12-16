import offersInit from '../init-state';
import types from '../types';

import IAction, { IValue } from './interfaces';

const edit_offer = (state: IValue = offersInit.edit_offer, { type }: IAction): IValue => {
    switch (type) {
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
