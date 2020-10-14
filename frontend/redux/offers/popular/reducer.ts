import { AnyAction } from 'redux';

import { IOfferPopular } from '../../../interfaces';
import types from '../../types';

const popular = (
  state: IOfferPopular = { data: null, loading: true },
  { type, payload }: AnyAction,
): IOfferPopular => {
  switch (type) {
    case types.GET_POPULAR_OFFERS_SUCCESS:
      return { data: payload, loading: false };

    case types.GET_POPULAR_OFFERS_START:
      return { ...state, loading: true };

    case types.GET_POPULAR_OFFERS_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default popular;
