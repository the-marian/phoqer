import type { ID } from 'phoqer';
import { asyncCache } from 'phoqer-shared';

import { privateApiClient } from '@app/http/http';
import type { OfferMeta } from '@app/types/single-offer.type';

class MetaService {
    @asyncCache
    async getOfferMeta(id: ID): Promise<OfferMeta> {
        const { data } = await privateApiClient.get<OfferMeta>(`/meta/offers/${id}`);

        return data;
    }
}

export const metaService = new MetaService();
