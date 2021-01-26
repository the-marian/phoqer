import { HYDRATE } from 'next-redux-wrapper';

import { IComment, IState } from '../../interfaces';
import types from '../types';

interface IAction {
    type: typeof types.GET_COMMENTS_START | typeof types.GET_COMMENTS_ERROR | typeof types.GET_COMMENTS_SUCCESS;
    payload: IComment[] | IState | null;
}

const comments = (
    state: { loading: boolean; data: IComment[] | null } = { loading: false, data: null },
    { type, payload }: IAction,
): IComment[] | { loading: boolean; data: IComment[] | null } => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).comments;

        case types.GET_COMMENTS_SUCCESS:
            return { loading: false, data: payload as IComment[] };

        case types.CREATE_COMMENT_START:
            return { ...state, loading: true };

        default:
            return state;
    }
};

export default comments;
