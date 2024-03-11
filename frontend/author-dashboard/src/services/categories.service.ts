import { ICategories } from 'phoqer';
import { asyncCache } from 'phoqer-shared';

import { privateApiClient } from 'src/http/http';

class CategoriesService {
    @asyncCache
    async getCategories(): Promise<ICategories> {
        const { data } = await privateApiClient.get<ICategories>('/categories');

        return data;
    }
}

export const categoriesService = new CategoriesService();
