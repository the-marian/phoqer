import {
    FC,
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { get } from 'lodash-es';
import { useRouter } from 'next/router';
import { ID } from 'phoqer';
import { useAuthContext } from 'phoqer-shared';

import { useErrorToast } from '@app/hook/error-toast.hook';
import { metaService } from '@app/services/meta.service';
import { OfferMeta } from '@app/types/single-offer.type';

interface OfferMetaContextType {
    isLoading: boolean;
    fetchData: () => Promise<void>;
    offerMeta: OfferMeta;
    setOfferMeta: Dispatch<SetStateAction<OfferMeta>>;
}
export const OfferMetaContext = createContext<OfferMetaContextType>({} as OfferMetaContextType);

const defaultValue: OfferMeta = {
    canDelete: false,
    canEdit: false,
    canRent: true,
    canChat: true,
    canAddToFavorite: false,
    isInFavorite: false,
};

export const OfferMetaContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const offerId = get(router, 'query.offerId');

    const errorToast = useErrorToast();
    const { auth } = useAuthContext();

    const [isLoading, setIsLoading] = useState(true);
    const [offerMeta, setOfferMeta] = useState<OfferMeta>(defaultValue);

    const fetchData = useCallback(() => {
        return metaService
            .getOfferMeta(offerId as ID)
            .then(setOfferMeta)
            .catch(() => errorToast());
    }, [offerId]);

    useEffect(() => {
        if (auth) {
            fetchData().finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [offerId, auth]);

    const value = useMemo(
        () => ({
            isLoading,
            fetchData,
            offerMeta,
            setOfferMeta,
        }),
        [isLoading, offerMeta],
    );

    return <OfferMetaContext.Provider value={value}>{children}</OfferMetaContext.Provider>;
};

export const useOfferMetaContext = (): OfferMetaContextType => {
    return useContext(OfferMetaContext);
};
