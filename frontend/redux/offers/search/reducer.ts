import { HYDRATE } from 'next-redux-wrapper';

import { IOfferDynamic, IOfferPagination, IState } from '../../../interfaces';
import types from '../../types';
import IAction from './interfaces';

const search = (
    state: IOfferDynamic = { data: { data: [], total: 0 }, loading: true, pagination: true },
    { type, payload }: IAction,
): IOfferDynamic => {
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
            return { ...state, loading: false, pagination: false };

        case types.PATCH_FAVORITE_OFFERS_SUCCESS:
            return state.data.data.length
                ? {
                      data: {
                          ...state.data,
                          data: state.data.data.map(item =>
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
