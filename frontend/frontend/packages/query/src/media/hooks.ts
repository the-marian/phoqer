import { useMutation } from '@tanstack/react-query';

import { uploadMediaFetcher } from './fetchers';

export const useUploadMedia = () => {
    return useMutation<string, unknown, FormData>({
        mutationKey: ['media'],
        mutationFn: uploadMediaFetcher,
    });
};
