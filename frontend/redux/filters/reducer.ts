import types from '../types';
import IAction from './interfaces';

const filters = (state = true, { type }: IAction): boolean => {
    switch (type) {
        case types.SEARCH_FILTERS:
            return !state;

        default:
            return state;
    }
};

export default filters;
