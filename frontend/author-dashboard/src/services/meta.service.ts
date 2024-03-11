import { asyncCache } from 'phoqer-shared';

import { privateApiClient } from 'src/http/http';
import { AuthorMeta } from 'src/types/meta.type';

class MetaService {
    @asyncCache
    async getAuthorMeta(): Promise<AuthorMeta> {
        const { data } = await privateApiClient.get<AuthorMeta>('/meta/author');

        return data;
    }
}

export const metaService = new MetaService();
