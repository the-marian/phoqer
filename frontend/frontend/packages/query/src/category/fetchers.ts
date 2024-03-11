import { publicApi } from '../api';

import { Category } from './types';

export const getCategoriesFetcher = () => {
    return publicApi.get<Category[]>('/categories').then(res => res.data);
};

export const getCategoryBySlugFetcher = (slug: string) => {
    return publicApi.get<Category>(`/categories/${slug}`).then(res => res.data);
};
