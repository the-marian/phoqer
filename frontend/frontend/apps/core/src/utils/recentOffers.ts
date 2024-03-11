import { OfferCard } from 'query';

export interface RecentOfferCard extends OfferCard {
    storedAt: number;
}

export class RecentOffers {
    static MAX_LENGTH = 12;
    static ONE_DAY_IN_MS = 86_400_000;
    static STORE_KEY = 'stored-offers-key';

    setOffers = (offer: RecentOfferCard[]): void => {
        try {
            localStorage.setItem(RecentOffers.STORE_KEY, JSON.stringify(offer));
        } catch (e) {
            console.log('storageSet error', e);
        }
    };

    getOffers = (): RecentOfferCard[] => {
        try {
            const offerStr = localStorage.getItem(RecentOffers.STORE_KEY);
            if (!offerStr) return [];

            return JSON.parse(offerStr) as RecentOfferCard[];
        } catch {
            return [];
        }
    };
}

export const recentOffers = new RecentOffers();
