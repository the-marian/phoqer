import { HYDRATE } from 'next-redux-wrapper';
import { IAction } from './saga';
import { IPublicProfile, IState } from '../../interfaces';
import types from '../types';

const publicProfile = (state: IPublicProfile | null = null, { type, payload }: IAction): IPublicProfile | null => {
    switch (type) {
        case HYDRATE:
            return (payload as IState).profile.public;

        case types.GET_PUBLIC_PROFILE_SUCCESS:
            return payload as IPublicProfile;

        default:
            return state;
    }
};

export default publicProfile;