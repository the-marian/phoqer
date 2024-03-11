import {
    FC,
    createContext,
    Dispatch,
    SetStateAction,
    useState,
    useRef,
    useMemo,
    useCallback,
    useContext,
    PropsWithChildren,
} from 'react';

import { OfferListType } from 'phoqer';
import { getEmptyPagination, getPerPage, setPerPage, cacheMap } from 'phoqer-shared';

import { useErrorToast } from '@app/hook/error-toast.hook';
import { useSuccessToast } from '@app/hook/success-toast.hook';
import { favoriteService } from '@app/services/favorite.service';

interface FavoriteContext {
    currentPage: number;
    setCurrentPage: (value: number) => void;
    perPage: number;
    setPerPage: (value: number) => void;
    loading: boolean;
    loadMore: () => void;
    favorite: OfferListType;
    setFavorite: Dispatch<SetStateAction<OfferListType>>;
    deleteFavorite: (id: number | string) => void;
    initTable: () => void;
}
export const FavoriteContext = createContext<FavoriteContext>({} as FavoriteContext);

export const FavoriteContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const errorToast = useErrorToast();
    const successToast = useSuccessToast();

    const currentPageRef = useRef<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [favorite, setFavorite] = useState<OfferListType>(getEmptyPagination());

    const handleMoreFavorite = useCallback((res: OfferListType): void => {
        setFavorite(prev => ({ ...res, data: [...prev.data, ...res.data] }));
    }, []);

    const fetchData = useCallback(
        (callback: (value: OfferListType) => void): Promise<void> => {
            return favoriteService
                .getFavorite({ limit: getPerPage(), page: currentPageRef.current })
                .then(callback)
                .catch(() => errorToast());
        },
        [errorToast],
    );

    const initTable = useCallback(() => {
        setLoading(true);
        fetchData(setFavorite).finally(() => setLoading(false));
    }, [fetchData, setFavorite]);

    const handlePerPage = useCallback(
        (value: number): void => {
            setPerPage(value);
            currentPageRef.current = 1;
            fetchData(setFavorite);
        },
        [fetchData, setFavorite],
    );

    const handleNextPage = useCallback(
        (value: number): void => {
            currentPageRef.current = value;
            fetchData(setFavorite);
        },
        [fetchData, setFavorite],
    );

    const loadMore = useCallback((): void => {
        currentPageRef.current += 1;
        fetchData(handleMoreFavorite);
    }, [fetchData, handleMoreFavorite]);

    const deleteFavorite = useCallback(
        (id: number | string): void => {
            favoriteService
                .deleteFavorite(id)
                .then(() => cacheMap.reset())
                .then(() => fetchData(setFavorite))
                .then(() => successToast('You have successfully deleted offer from favorites'))
                .catch(() => errorToast());
        },
        [errorToast, fetchData],
    );

    const value = useMemo(
        () => ({
            loading,
            loadMore,
            favorite,
            setFavorite,
            perPage: getPerPage(),
            setPerPage: handlePerPage,
            currentPage: currentPageRef.current,
            setCurrentPage: handleNextPage,
            deleteFavorite,
            initTable,
        }),
        [deleteFavorite, favorite, handleNextPage, handlePerPage, initTable, loadMore, loading],
    );

    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};

export const useFavoriteContext = (): FavoriteContext => {
    return useContext(FavoriteContext);
};
