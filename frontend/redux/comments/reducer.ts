// import { HYDRATE } from 'next-redux-wrapper';
//
// import { ICategories, IState } from '../../interfaces';
import { HYDRATE } from 'next-redux-wrapper';

import { IComment, IState } from '../../interfaces';
import types from '../types';

interface IAction {
    type: typeof types.GET_COMMENTS_START | typeof types.GET_COMMENTS_ERROR | typeof types.GET_COMMENTS_SUCCESS;
    payload: IComment[] | IState | null;
}

const comments = (state: IComment[] | null = null, { type, payload }: IAction): IComment[] | null => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).comments;

        case types.GET_COMMENTS_SUCCESS:
            return payload as IComment[];

        default:
            return state;
    }
};

export default comments;
