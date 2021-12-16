import { HYDRATE } from 'next-redux-wrapper';

import { IPublicProfile, IState } from '../../../interfaces';
import types from '../types';
import IAction from './interfaces';
import profilesInit from "../init-state";

const publicProfile = (state: IPublicProfile | null = profilesInit.public, { type, payload }: IAction): IPublicProfile | null => {
    switch (type) {
        case HYDRATE: {
            const publicProfile = (payload as IState).profiles.public;
            if (+(publicProfile?.id || 0)) return publicProfile;
            return state;
        }

        case types.GET_PUBLIC_PROFILE_SUCCESS:
            return payload as IPublicProfile;

        default:
            return state;
    }
};

export default publicProfile;
