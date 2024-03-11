import {
    ReactNode,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
    useCallback,
    useRef,
    useMemo,
    useContext,
    FC,
} from 'react';

import { ID, Offer, OfferList } from 'phoqer';

import { getEmptyPagination } from 'src/utils/pagination';
import { getPerPage, setPerPage } from 'src/utils/per-page';

export enum OffersStatus {
    ACTIVE = 'active',
    DISABLED = 'disabled',
}

export type OffersContextType = {
    currentPage: number;
    setCurrentPage: (value: number) => void;
    perPage: number;
    setPerPage: (value: number) => void;
    status: string;
    setStatus: (value: string) => void;
    loading: boolean;
    loadMore: () => void;
    offers: OfferList;
    setOffers: Dispatch<SetStateAction<OfferList>>;
    updateOffer: (order: Offer) => void;
    deleteOffer: (id: ID) => void;
    initTable: () => void;
};
export const OffersContext = createContext<OffersContextType>({} as OffersContextType);

interface Props {
    onError: () => void;
    children: ReactNode;
    http: (params: Record<string, string | number>) => Promise<OfferList>;
}
export const OffersContextProvider: FC<Props> = ({ http, children, onError }) => {
    const currentPageRef = useRef<number>(1);
    const statusRef = useRef<string>(OffersStatus.ACTIVE);

    const [loading, setLoading] = useState<boolean>(true);
    const [offers, setOffers] = useState<OfferList>(getEmptyPagination());

    const handleMoreOffers = useCallback((data: OfferList): void => {
        setOffers((prev: OfferList) => ({ ...data, data: [...prev.data, ...data.data] }));
    }, []);

    const fetchData = useCallback(
        (callback: (value: OfferList) => void): Promise<void> => {
            return http({ limit: getPerPage(), page: currentPageRef.current, status: statusRef.current })
                .then(callback)
                .catch(onError);
        },
        [http, onError],
    );

    const initTable = useCallback(() => {
        setLoading(true);
        fetchData(setOffers).finally(() => setLoading(false));
    }, [fetchData, setOffers]);

    const handlePerPage = useCallback(
        (value: number): void => {
            setPerPage(value);
            currentPageRef.current = 1;
            fetchData(setOffers);
        },
        [fetchData, setOffers],
    );

    const handleNextPage = useCallback(
        (value: number): void => {
            currentPageRef.current = value;
            fetchData(setOffers);
        },
        [fetchData, setOffers],
    );

    const loadMore = useCallback((): void => {
        currentPageRef.current += 1;
        fetchData(handleMoreOffers);
    }, [fetchData, handleMoreOffers]);

    const handleStatus = useCallback(
        (value: string) => {
            statusRef.current = value;
            currentPageRef.current = 1;
            fetchData(setOffers);
        },
        [fetchData, setOffers],
    );

    const updateOffer = useCallback((order: Offer): void => {
        setOffers((prev: OfferList) => {
            const data = prev.data.map<Offer>((item: Offer) => (item.id === order.id ? order : item));
            return { ...prev, data };
        });
    }, []);

    const deleteOffer = useCallback((id: ID): void => {
        setOffers((prev: OfferList) => {
            const data = prev.data.filter((item: Offer) => item.id !== id);
            return { ...prev, data };
        });
    }, []);

    const value = useMemo(
        () => ({
            loading,
            loadMore,
            offers,
            setOffers,
            perPage: getPerPage(),
            setPerPage: handlePerPage,
            currentPage: currentPageRef.current,
            setCurrentPage: handleNextPage,
            status: statusRef.current,
            setStatus: handleStatus,
            initTable,
            updateOffer,
            deleteOffer,
        }),
        [loading, loadMore, offers, handlePerPage, handleNextPage, handleStatus, initTable, updateOffer, deleteOffer],
    );

    return <OffersContext.Provider value={value}>{children}</OffersContext.Provider>;
};

export const useOffersContext = (): OffersContextType => {
    return useContext(OffersContext);
};
