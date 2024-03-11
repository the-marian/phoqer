import { privateApi } from '../api';

import { UserType } from './types';

export const getProfileFetcher = () => {
    return privateApi.get<UserType>('/users').then(res => res.data);
};
