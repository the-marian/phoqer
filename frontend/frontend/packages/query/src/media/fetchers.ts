import { privateApi } from '../api';

import { MediaResponse } from './types';

export const uploadMediaFetcher = (body: FormData) => {
    return privateApi
        .post<MediaResponse>('/uploads', body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => res.data.url);
};
