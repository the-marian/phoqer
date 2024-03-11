import { FC, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import { OfferListType } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';

import { OffersCardList } from '@app/components/offers-card-list/offers-card-list';
import { useErrorToast } from '@app/hook/error-toast.hook';
import { offersService } from '@app/services/offers.service';

export const SearchOffers: FC = () => {
    const { query } = useRouter();
    const errorToast = useErrorToast();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<OfferListType>(getEmptyPagination());

    useEffect(() => {
        setIsLoading(true);
        offersService
            .getOffers(query as Record<string, string>)
            .then(setData)
            .catch(() => errorToast())
            .finally(() => setIsLoading(false));
    }, []);

    return <OffersCardList isLoading={isLoading} offers={data.data} size={{ base: 1, md: 3, lg: 4 }} />;
};
