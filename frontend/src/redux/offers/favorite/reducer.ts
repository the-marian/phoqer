import { IOfferCard, IOfferStatic } from '../../../interfaces';
import offersInit from '../init-state';
import types from '../types';

import IAction from './interfaces';

const favorite = (state: IOfferStatic = offersInit.favorite, { type, payload }: IAction): IOfferStatic => {
    switch (type) {
        case types.GET_FAVORITE_OFFERS_SUCCESS:
            return { data: payload as IOfferCard[], loading: false };

        case types.PATCH_FAVORITE_OFFERS_SUCCESS:
            return state.data.length
                ? { data: state.data.filter(item => item.id !== (payload as string)), loading: false }
                : state;

        default:
            return state;
    }
};

export default favorite;
