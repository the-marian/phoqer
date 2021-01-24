// import { HYDRATE } from 'next-redux-wrapper';
//
// import { ICategories, IState } from '../../interfaces';
import types from '../types';

interface IAction {
    type: typeof types.GET_COMMENTS_START | typeof types.GET_COMMENTS_ERROR | typeof types.GET_COMMENTS_SUCCESS;
    payload: [] | null;
}

const comments = (state: [] = [], { type, payload }: IAction): [] => {
    switch (type) {
        case types.GET_COMMENTS_SUCCESS:
            return payload;

        case types.GET_COMMENTS_START:
        case types.GET_COMMENTS_ERROR:
            return state;

        default:
            return state;
    }
};

export default comments;
