import { HYDRATE } from 'next-redux-wrapper';

import { IOfferCard, IOfferStatic, IState } from '../../../interfaces';
import offersInit from '../init-state';
import types from '../types';

import IAction from './interfaces';

const popular = (state: IOfferStatic = offersInit.popular, { type, payload }: IAction): IOfferStatic => {
    switch (type) {
        case HYDRATE: {
            const popular = (payload as IState).offers.popular;
            if (popular.data.length) return popular;
            return state;
        }

        case types.GET_POPULAR_OFFERS_SUCCESS:
            return { data: payload as IOfferCard[], loading: false };

        case types.GET_POPULAR_OFFERS_START:
            return { ...state, loading: true };

        case types.GET_POPULAR_OFFERS_ERROR:
            return { ...state, loading: false };

        case types.PATCH_FAVORITE_OFFERS_SUCCESS:
            return state.data.length
                ? {
                      data: state.data.map<IOfferCard>(item =>
                          item.id === (payload as string) ? { ...item, is_favorite: !item.is_favorite } : item,
                      ),
                      loading: false,
                  }
                : state;

        default:
            return state;
    }
};

export default popular;
