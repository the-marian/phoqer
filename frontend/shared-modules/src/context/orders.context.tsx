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

import { OrdersList, Order, OrderStatus } from 'phoqer';

import { getEmptyPagination } from 'src/utils/pagination';
import { getPerPage, setPerPage } from 'src/utils/per-page';

export type OrdersContextType = {
    currentPage: number;
    setCurrentPage: (value: number) => void;
    perPage: number;
    setPerPage: (value: number) => void;
    status: OrderStatus;
    setStatus: (value: OrderStatus) => void;
    loading: boolean;
    loadMore: () => void;
    orders: OrdersList;
    setOrders: Dispatch<SetStateAction<OrdersList>>;
    updateOrders: (order: Order) => void;
    deleteOrder: (id: string) => void;
    initTable: () => void;
};
export const OrdersContext = createContext<OrdersContextType>({} as OrdersContextType);

interface Props {
    onError: () => void;
    children: ReactNode;
    http: (params: Record<string, string | number>) => Promise<OrdersList>;
}
export const OrdersContextProvider: FC<Props> = ({ http, children, onError }) => {
    const currentPageRef = useRef<number>(1);
    const statusRef = useRef<OrderStatus>(OrderStatus.PENDING);

    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<OrdersList>(getEmptyPagination());

    const handleMoreOrders = useCallback((data: OrdersList): void => {
        setOrders((prev: OrdersList) => ({ ...data, data: [...prev.data, ...data.data] }));
    }, []);

    const fetchData = useCallback(
        (callback: (value: OrdersList) => void): Promise<void> => {
            return http({ limit: getPerPage(), page: currentPageRef.current, status: statusRef.current })
                .then(callback)
                .catch(onError);
        },
        [http, onError],
    );

    const initTable = useCallback(() => {
        setLoading(true);
        fetchData(setOrders).finally(() => setLoading(false));
    }, [fetchData, setOrders]);

    const handlePerPage = useCallback(
        (value: number): void => {
            setPerPage(value);
            currentPageRef.current = 1;
            fetchData(setOrders);
        },
        [fetchData, setOrders],
    );

    const handleNextPage = useCallback(
        (value: number): void => {
            currentPageRef.current = value;
            fetchData(setOrders);
        },
        [fetchData, setOrders],
    );

    const loadMore = useCallback((): void => {
        currentPageRef.current += 1;
        fetchData(handleMoreOrders);
    }, [fetchData, handleMoreOrders]);

    const handleStatus = useCallback(
        (value: OrderStatus) => {
            statusRef.current = value;
            currentPageRef.current = 1;
            fetchData(setOrders);
        },
        [fetchData, setOrders],
    );

    const updateOrders = useCallback((order: Order): void => {
        setOrders((prev: OrdersList) => {
            const data = prev.data.map<Order>((item: Order) => (item.id === order.id ? order : item));
            return { ...prev, data };
        });
    }, []);

    const deleteOrder = useCallback((id: string): void => {
        setOrders((prev: OrdersList) => {
            const data = prev.data.filter((item: Order) => item.id !== id);
            return { ...prev, data };
        });
    }, []);

    const value = useMemo(
        () => ({
            loading,
            loadMore,
            orders,
            setOrders,
            perPage: getPerPage(),
            setPerPage: handlePerPage,
            currentPage: currentPageRef.current,
            setCurrentPage: handleNextPage,
            status: statusRef.current,
            setStatus: handleStatus,
            updateOrders,
            deleteOrder,
            initTable,
        }),
        [deleteOrder, handleNextPage, handlePerPage, handleStatus, loadMore, loading, orders, updateOrders, initTable],
    );

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrdersContext = (): OrdersContextType => {
    return useContext(OrdersContext);
};
