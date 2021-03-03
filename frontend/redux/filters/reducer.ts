import types from '../types';

interface IAction {
    type: typeof types.SEARCH_FILTERS;
}

const filters = (state = true, { type }: IAction): boolean => {
    switch (type) {
        case types.SEARCH_FILTERS:
            return !state;

        default:
            return state;
    }
};

export default filters;
