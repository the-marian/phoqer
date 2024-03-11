import { useMemo, useEffect, useState, FC } from 'react';

import { debounce } from 'lodash-es';
import { OfferListType } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';

import { OffersList } from '@app/components/offers-list/offers-list';
import { useErrorToast } from '@app/hook/error-toast.hook';
import { offersService } from '@app/services/offers.service';

import { useNavigation } from './hook';

interface Props {
    query: string;
    onClose: () => void;
}
export const OffersTab: FC<Props> = ({ query, onClose }) => {
    const errorToast = useErrorToast();
    const { navigate } = useNavigation(onClose);

    const [loading, setLoading] = useState(true);
    const [searchResult, setSearchResult] = useState<OfferListType>(getEmptyPagination);

    const handleFetch = useMemo(
        () =>
            debounce(value => {
                offersService
                    .getOffers({ query: value })
                    .then(setSearchResult)
                    .catch(errorToast)
                    .finally(() => setLoading(false));
            }, 500),
        [],
    );

    useEffect(() => {
        setLoading(true);
        handleFetch(query);
    }, [handleFetch, query]);

    return <OffersList offers={searchResult} loading={loading} navigate={navigate} />;
};
