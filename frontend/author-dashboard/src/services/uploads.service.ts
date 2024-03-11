import { ID, OfferItemType } from 'phoqer';

import { privateApiClient } from 'src/http/http';

class UploadsService {
    async upload(body: FormData): Promise<string> {
        const { data } = await privateApiClient.post<Record<'url', string>>('/uploads', body, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return data.url;
    }

    deleteOfferImage(offerId: ID, images: string[]): Promise<void> {
        return privateApiClient.delete(`/offers/${offerId}/uploads`, { data: { images } });
    }

    async updateOfferImages(offerId: ID, images: string[]): Promise<OfferItemType> {
        const { data } = await privateApiClient.put<OfferItemType>(`/offers/${offerId}/uploads`, { images });

        return data;
    }
}

export const uploadsService = new UploadsService();
