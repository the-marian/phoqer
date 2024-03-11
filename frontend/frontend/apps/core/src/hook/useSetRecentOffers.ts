import { useCallback } from 'react';

import { recentOffers, RecentOfferCard, RecentOffers } from '@app/utils';
import { OfferCard, OfferItem } from 'query';

type SetRecentOfferHook = (offer: OfferCard | OfferItem) => void;

export const normalizeOfferItem = (item: OfferItem): OfferCard => ({
    ...item,
    image: item.images[0],
    authorId: item.author.id,
    category: item.category.title,
    sale: item.sale?.percentage,
});

export const useSetRecentOffer = (): SetRecentOfferHook => {
    return useCallback(offer => {
        try {
            const storedOffers = recentOffers.getOffers().filter(item => item.id !== offer.id);

            const offerCard: OfferCard = (offer as OfferCard).authorId
                ? (offer as OfferCard)
                : normalizeOfferItem(offer as OfferItem);
            const nextOffer: RecentOfferCard = { ...offerCard, storedAt: Date.now() };

            const offersToStore: RecentOfferCard[] = [...storedOffers, nextOffer]
                .slice(0, RecentOffers.MAX_LENGTH)
                .filter(item => Date.now() - item.storedAt < RecentOffers.ONE_DAY_IN_MS)
                .sort((a, b) => b.storedAt - a.storedAt);

            recentOffers.setOffers(offersToStore);
        } catch (e) {
            console.log('useSetRecentOffers error', e);
        }
    }, []);
};
