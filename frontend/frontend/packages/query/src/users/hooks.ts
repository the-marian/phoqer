import { useQuery } from '@tanstack/react-query';

import { getProfileFetcher } from './fetchers';
import { UserType } from './types';

export const useGetProfile = (enabled = true) => {
    return useQuery<UserType>({
        queryKey: ['profile'],
        queryFn: getProfileFetcher,
        keepPreviousData: true,
        enabled,
    });
};
