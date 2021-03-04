import { HYDRATE } from 'next-redux-wrapper';

import { IComment, IState } from '../../interfaces';
import types from '../types';
import { IAction } from './interfaces';

type Action = { loading: boolean; data: IComment[] | null };
const INIT: Action = { loading: false, data: null };

const comments = (state: Action = INIT, { type, payload }: IAction): IComment[] | Action => {
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
