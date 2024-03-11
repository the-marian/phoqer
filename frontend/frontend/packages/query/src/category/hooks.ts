import { useQuery } from '@tanstack/react-query';

import { getCategoriesFetcher, getCategoryBySlugFetcher } from './fetchers';
import { Category } from './types';

export const useGetCategories = () => {
    return useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: getCategoriesFetcher,
    });
};

export const useGetCategoryBySlug = (slug?: string | null) => {
    return useQuery<Category>({
        queryKey: ['categories', slug],
        queryFn: () => getCategoryBySlugFetcher(slug!),
        enabled: Boolean(slug),
    });
};
