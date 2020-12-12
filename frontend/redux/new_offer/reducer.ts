import types from '../types';

interface IAction {
    type: typeof types.SEARCH_FILTERS;
    payload: boolean;
}

const filters = (state = true, { type, payload }: IAction): boolean => {
    switch (type) {
        case types.SEARCH_FILTERS:
            return payload;

        default:
            return state;
    }
};

export default filters;
