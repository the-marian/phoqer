import type { ID, OfferListType } from 'phoqer';
import type { AxiosResponse } from 'phoqer-shared';
import { asyncCache } from 'phoqer-shared';

import { privateApiClient } from '@app/http/http';

class FavoriteService {
    addToFavorite(offerId: ID): Promise<AxiosResponse> {
        return privateApiClient.post(`/favorite/${offerId}`);
    }

    deleteFavorite(offerId: ID): Promise<AxiosResponse> {
        return privateApiClient.delete(`/favorite/${offerId}`);
    }

    @asyncCache
    async getFavorite(params: Record<string, string | number>): Promise<OfferListType> {
        const { data } = await privateApiClient.get<OfferListType>('/favorite', { params });

        return data;
    }
}

export const favoriteService = new FavoriteService();
