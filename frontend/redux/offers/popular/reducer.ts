import { HYDRATE } from 'next-redux-wrapper';

import { IOfferCard, IOfferStatic, IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction from './interfaces';

const popular = (state: IOfferStatic = initState.offers.popular, { type, payload }: IAction): IOfferStatic => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.popular;

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
