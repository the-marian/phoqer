import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';

import { ICategories } from '../../interfaces';
import types from '../types';

const user = (state: ICategories = null, { type, payload }: AnyAction): ICategories => {
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
