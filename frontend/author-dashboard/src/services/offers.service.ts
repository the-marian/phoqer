import { OfferItemType, ID, Offer, OfferList } from 'phoqer';
import { asyncCache } from 'phoqer-shared';

import { privateApiClient } from 'src/http/http';
import { NewOfferData } from 'src/pages/new-offer/new-offer.types';
import { replaceHeadingTag } from 'src/pages/new-offer/new-offer.utils';

class OffersService {
    async newOffer(body: NewOfferData): Promise<OfferItemType> {
        const { data } = await privateApiClient.post<OfferItemType>('/offers', {
            ...body,
            price: Number(body.price),
            category: body.category?.slug,
            description: replaceHeadingTag(body.description),
        });

        return data;
    }

    @asyncCache
    async getOffers(params: Record<string, string | number>): Promise<OfferList> {
        const { data } = await privateApiClient.get<OfferList>('/offers/author', { params });

        return data;
    }

    @asyncCache
    async getSingleOffer(id: ID): Promise<Offer> {
        const { data } = await privateApiClient.get<Offer>(`/offers/${id}`);

        return data;
    }

    async updateOffer(id: ID, body: Partial<Offer>): Promise<Offer> {
        const { data } = await privateApiClient.put<Offer>(`/offers/${id}`, body);

        return data;
    }

    async deleteOffer(id: ID): Promise<void> {
        return privateApiClient.delete(`/offers/${id}`);
    }
}

export const offersService = new OffersService();
