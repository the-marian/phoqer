import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import types from '../types';
import { ICategories } from '../../interfaces';

const user = (
  state: ICategories = null,
  { type, payload }: AnyAction
): ICategories => {
  switch (type) {
    case HYDRATE:
      return payload.categories;

    case types.GET_CATEGORIES_SUCCESS:
      return payload;

    case types.GET_CATEGORIES_START:
    case types.GET_CATEGORIES_ERROR:
      return state;

    default:
      return state;
  }
};

export default user;
