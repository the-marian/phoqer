import type { ID, OfferCardType, OfferItemType, OfferListType } from 'phoqer';
import { asyncCache } from 'phoqer-shared';

import { UiPagination } from '@app/config/ui.config';
import { publicApiClient } from '@app/http/http';
import type { SearchOffer } from '@app/types/offers.type';
import type { SingleOfferData } from '@app/types/single-offer.type';

// commet to trigger build
class OffersService {
    @asyncCache
    async getOffers(params: Record<string, string | number | boolean> = {}): Promise<OfferListType> {
        const { data } = await publicApiClient.get<OfferListType>('/offers', {
            params: { limit: UiPagination.MD, ...params },
        });

        return data;
    }

    @asyncCache
    async quickSearch(query: string): Promise<SearchOffer[]> {
        const { data } = await publicApiClient.get<SearchOffer[]>('/offers/search', {
            params: { query },
        });

        return data;
    }

    @asyncCache
    async topOffers(): Promise<OfferCardType[]> {
        const { data } = await publicApiClient.get<OfferCardType[]>('/offers/top', {
            params: { limit: UiPagination.LG },
        });

        return data;
    }

    @asyncCache
    async singleOffer(id: ID): Promise<SingleOfferData> {
        const { data: offer } = await publicApiClient.get<OfferItemType>(`/offers/${id}`);
        const { data: authorOffers } = await publicApiClient.get<OfferListType>(`/offers/users/${offer.author.id}`, {
            params: { limit: UiPagination.SM + 2 },
        });
        const { data: categoryOffers } = await publicApiClient.get<OfferListType>(`/offers/categories/${offer.category.slug}`, {
            params: { limit: UiPagination.MD },
        });

        return { offer, authorOffers, categoryOffers };
    }

    async category(slug: string, limit = UiPagination.MD): Promise<OfferListType> {
        const { data } = await publicApiClient.get<OfferListType>(`/offers/categories/${slug}`, {
            params: { limit },
        });

        return data;
    }
}

export const offersService = new OffersService();
