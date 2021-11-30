import { HYDRATE } from 'next-redux-wrapper';

import { ICategories, IState } from '../../interfaces';

import categoriesInit from './init-state';
import IAction from './interfaces';
import types from './types';

const categories = (state: ICategories[] = categoriesInit, { type, payload }: IAction): ICategories[] => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).categories;

        case types.GET_CATEGORIES_SUCCESS:
            return payload as ICategories[];

        case types.GET_CATEGORIES_START:
        case types.GET_CATEGORIES_ERROR:
            return state;

        default:
            return state;
    }
};

export default categories;
