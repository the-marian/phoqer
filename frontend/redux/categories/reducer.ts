import { HYDRATE } from 'next-redux-wrapper';

import { ICategories, IState } from '../../interfaces';
import types from '../types';

interface IAction {
    type: typeof types.GET_CATEGORIES_START | typeof types.GET_CATEGORIES_ERROR | typeof types.GET_CATEGORIES_SUCCESS;
    payload: IState | ICategories[] | null;
}

const user = (state: ICategories[] = [], { type, payload }: IAction): ICategories[] => {
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

export default user;
