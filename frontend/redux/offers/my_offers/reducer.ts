import { HYDRATE } from 'next-redux-wrapper';

import { IOfferCard, IOfferDynamic, IOfferPagination, IState } from '../../../interfaces';
import initState from '../../state';
import types from '../../types';
import IAction from './interfaces';

const my_offers = (state: IOfferDynamic = initState.offers.my_offers, { type, payload }: IAction): IOfferDynamic => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).offers.my_offers;

        case types.MY_OFFERS_PAGINATION_SUCCESS:
        case types.PUBLIC_OFFERS_PAGINATION_SUCCESS:
            return {
                data: { ...state.data, data: [...state.data.data, ...(payload as IOfferPagination).data] },
                loading: false,
                pagination: false,
            };

        case types.DELETE_OFFER_SUCCESS:
            return {
                data: { ...state.data, data: state.data.data.filter(item => item.id !== (payload as string)) },
                loading: false,
                pagination: false,
            };

        case types.MY_OFFERS_SUCCESS:
        case types.PUBLIC_OFFERS_SUCCESS:
            return { data: payload as IOfferPagination, loading: false, pagination: false };

        case types.MY_OFFERS_START:
        case types.PUBLIC_OFFERS_START:
            return { ...state, loading: true };
        case types.MY_OFFERS_PAGINATION_START:
        case types.PUBLIC_OFFERS_PAGINATION_START:
            return { ...state, pagination: true };

        case types.MY_OFFERS_ERROR:
        case types.PUBLIC_OFFERS_ERROR:
        case types.MY_OFFERS_PAGINATION_ERROR:
        case types.PUBLIC_OFFERS_PAGINATION_ERROR:
            return { ...state, loading: false, pagination: false };

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

export default my_offers;
