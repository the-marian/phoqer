import { useCallback } from 'react';

import { get } from 'lodash-es';
import { useRouter } from 'next/router';
import { OfferCardType, OfferItemType } from 'phoqer';

interface StoredOfferCardType extends OfferCardType {
    date: number;
}

const MAX_LENGTH = 12;
const ONE_DAY_IN_MS = 86_400_000;
const STORE_KEY = 'stored-offers-key';

const storageGet = (): StoredOfferCardType[] => {
    try {
        const offerStr = localStorage.getItem(STORE_KEY);
        if (!offerStr) return [];

        return JSON.parse(offerStr) as StoredOfferCardType[];
    } catch {
        return [];
    }
};

const storageSet = (offer: StoredOfferCardType[]): void => {
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(offer));
    } catch (e) {
        console.log('storageSet error', e);
    }
};

type GetRecentOffersHook = () => StoredOfferCardType[];
export const useGetRecentOffers = (): GetRecentOffersHook => {
    const router = useRouter();
    const offerId = get(router, 'query.offerId');

    return useCallback(() => {
        const offers = storageGet();
        if (!offerId) return offers;
        return offers.filter(offer => offerId !== offer.id);
    }, [offerId]);
};

type SetRecentOffersHook = (offer: OfferItemType | OfferCardType) => void;
export const useSetRecentOffers = (): SetRecentOffersHook => {
    return useCallback(({ id, title, price, ...props }) => {
        try {
            const storedOffers = storageGet().filter(item => item.id !== id);

            const image = (props as OfferCardType)?.image || (props as OfferItemType)?.images[0];
            const authorId = (props as OfferCardType)?.authorId || (props as OfferItemType)?.author.id;
            const sale = (props as OfferItemType)?.sale?.percentage || (props as OfferCardType)?.sale;
            const category = (props as OfferItemType)?.category?.title || (props as OfferCardType)?.category;

            const normalizedOffer: StoredOfferCardType = {
                id,
                price,
                sale,
                title,
                image,
                authorId,
                category,
                date: Date.now(),
            };

            const offersToStore: StoredOfferCardType[] = [...storedOffers, normalizedOffer]
                .slice(0, MAX_LENGTH)
                .filter(item => Date.now() - item.date < ONE_DAY_IN_MS)
                .sort((a, b) => b.date - a.date);

            storageSet(offersToStore);
        } catch (e) {
            console.log('useSetRecentOffers error', e);
        }
    }, []);
};
