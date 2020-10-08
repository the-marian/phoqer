import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

import { PopularOffer } from '../../../interfaces';
import types from '../../types';

const popular = (
  state: PopularOffer[] = null,
  { type, payload }: AnyAction,
): PopularOffer[] => {
  switch (type) {
    case HYDRATE:
      return payload.offers.popular;

    case types.GET_POPULAR_OFFERS_SUCCESS:
      return payload;

    case types.GET_POPULAR_OFFERS_START:
    case types.GET_POPULAR_OFFERS_ERROR:
      return state;

    default:
      return state;
  }
};

export default popular;
