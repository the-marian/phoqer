import { HYDRATE } from 'next-redux-wrapper';

import { IOfferCard, IOfferDynamic, IOfferPagination, IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction from './interfaces';

const search = (state: IOfferDynamic = initState.offers.search, { type, payload }: IAction): IOfferDynamic => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.search;

        case types.SEARCH_OFFERS_PAGINATION_SUCCESS:
            return {
                data: { ...state.data, data: [...state.data.data, ...(payload as IOfferPagination).data] },
                pagination: false,
                loading: false,
            };

        case types.SEARCH_OFFERS_SUCCESS:
            return { data: payload as IOfferPagination, loading: false, pagination: false };

        case types.SEARCH_OFFERS_START:
            return { ...state, pagination: true };
        case types.SEARCH_OFFERS_PAGINATION_START:
            return { ...state, loading: true };

        case types.SEARCH_OFFERS_ERROR:
        case types.SEARCH_OFFERS_PAGINATION_ERROR:
            return initState.offers.search;

        case types.PATCH_FAVORITE_OFFERS_SUCCESS:
            return state.data.data.length
                ? {
                      data: {
                          ...state.data,
                          data: state.data.data.map<IOfferCard>(item =>
                              item.id === (payload as string) ? { ...item, is_favorite: !item.is_favorite } : item,
                          ),
                      },
                      loading: false,
                      pagination: false,
                  }
                : state;

        default:
            return state;
    }
};

export default search;
