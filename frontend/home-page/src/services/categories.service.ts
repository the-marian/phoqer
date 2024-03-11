import { ICategories, ICategory } from 'phoqer';
import { asyncCache } from 'phoqer-shared';

import { publicApiClient } from '@app/http/http';

class CategoriesService {
    @asyncCache
    async getCategories(params?: Record<string, string | number>): Promise<ICategories> {
        const { data } = await publicApiClient.get<ICategories>('/categories', { params });

        return data;
    }

    @asyncCache
    async singleCategory(slug: string): Promise<ICategory> {
        const { data } = await publicApiClient.get<ICategory>(`/categories/${slug}`);

        return data;
    }
}

export const categoriesService = new CategoriesService();
