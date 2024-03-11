import { useEffect, useState } from 'react';

import { recentOffers, RecentOfferCard } from '@app/utils';
import { get } from 'lodash-es';
import { useRouter } from 'next/router';

export const useGetRecentOffers = (): RecentOfferCard[] => {
    const router = useRouter();
    const offerId = get(router, 'query.offerId');

    const [offers, setOffers] = useState<RecentOfferCard[]>([]);

    useEffect(() => {
        const result = recentOffers.getOffers();
        if (!offerId) setOffers(result);
        return setOffers(result.filter(offer => offerId !== offer.id));
    }, [offerId]);

    return offers;
};
