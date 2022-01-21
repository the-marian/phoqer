import { HYDRATE } from 'next-redux-wrapper';

import { IOfferCard, IState } from '../../../interfaces';
import offersInit from '../init-state';
import types from '../types';

import IAction from './interfaces';

interface SingleOffer {
    data: IOfferCard | null;
    loading: boolean;
}

const single = (state: SingleOffer = offersInit.single, { type, payload }: IAction): SingleOffer => {
    switch (type) {
        case HYDRATE: {
            const single = (payload as IState).offers.single;
            if (single.data?.id) return single;
            return state;
        }

        case types.GET_SINGLE_OFFER_SUCCESS:
            return { data: payload as IOfferCard, loading: false };

        case types.GET_SINGLE_OFFER_ERROR:
            return { data: null, loading: false };

        case types.CHANGE_OFFER_COVER_IMAGE_LOCAL:
            return {
                data: {
                    ...state.data,
                    cover_image: payload as string,
                    images: [payload, ...(state.data?.images?.filter(img => img !== payload) || [])],
                } as IOfferCard,
                loading: false,
            };

        case types.DELETE_SINGLE_OFFER_IMG:
            return {
                ...state,
                data: { ...state.data, images: state.data?.images?.filter(url => url !== (payload as string)) } as IOfferCard,
            };
        case types.ADD_SINGLE_OFFER_IMG:
            return {
                ...state,
                data: { ...state.data, images: [...(state.data?.images || []), ...(payload as string[])] } as IOfferCard,
            };

        case types.PATCH_FAVORITE_OFFERS_SUCCESS:
            return state.data?.id === payload
                ? { ...state, data: { ...state.data, is_favorite: !state.data.is_favorite } }
                : state;

        default:
            return state;
    }
};

export default single;
