import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

import { IOfferCard } from '../../../interfaces';
import types from '../../types';

const popular = (
  state: IOfferCard[] = null,
  { type, payload }: AnyAction,
): IOfferCard[] => {
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
