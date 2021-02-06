import { HYDRATE } from 'next-redux-wrapper';

import { IProfile, IState } from '../../interfaces';
import types from '../types';

interface IAction {
    type: typeof types.GET_PROFILE_START | typeof types.GET_PROFILE_ERROR | typeof types.GET_PROFILE_SUCCESS;
    payload: IState | IProfile | null;
}

const comments = (
    state: IProfile | null = null,
    { type, payload }: IAction, ): IProfile | null => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).profile;

        case types.GET_PROFILE_SUCCESS:
            return payload as IProfile;

        default:
            return state;
    }
};

export default comments;
