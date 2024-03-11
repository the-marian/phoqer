import { ID, ReviewListType } from 'phoqer';
import { asyncCache } from 'phoqer-shared';

import { UiPagination } from '@app/config/ui.config';
import { publicApiClient } from '@app/http/http';
import type { OfferPhotosList } from '@app/types/single-offer.type';

class ReviewsService {
    @asyncCache
    async reviews(id: ID, page = 1): Promise<ReviewListType> {
        const { data } = await publicApiClient.get<ReviewListType>(`/reviews/${id}`, {
            params: { limit: UiPagination.XS, page },
        });

        return data;
    }

    @asyncCache
    async photos(id: ID, page = 1): Promise<OfferPhotosList> {
        const { data } = await publicApiClient.get<OfferPhotosList>(`/reviews/${id}/photos`, {
            params: { limit: UiPagination.XS, page },
        });

        return data;
    }

    @asyncCache
    async replies(id: ID, reviewId: ID): Promise<ReviewListType> {
        const { data } = await publicApiClient.get<ReviewListType>(`/reviews/${id}/replies/${reviewId}`);

        return data;
    }
}

export const reviewsService = new ReviewsService();
