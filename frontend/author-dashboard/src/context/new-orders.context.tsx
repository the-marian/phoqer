import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { OrdersList, OrderStatus } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';

import { UiPagination } from 'src/config/ui.config';
import { useErrorToast } from 'src/hook/error-toast.hook';
import { ordersService } from 'src/services/orders.service';
import { isTablet } from 'src/utils/media.utils';
import { ordersEvent } from 'src/utils/orders.utils';

interface NewOrdersContextType {
    orders: OrdersList;
    nextPage: () => void;
    fetchData: (params?: Record<string, string | number>) => Promise<void>;
}

export const NewOrdersContext = createContext<NewOrdersContextType>({} as NewOrdersContextType);

interface Props {
    children: ReactNode;
}
export const NewOrdersContextProvider = ({ children }: Props): JSX.Element => {
    const errorToast = useErrorToast();
    const [orders, setOrders] = useState<OrdersList>(getEmptyPagination());

    const fetchData = useCallback(
        (params: Record<string, string | number> = {}) => {
            return ordersService
                .getOrder({ ...params, status: OrderStatus.PENDING, limit: isTablet ? UiPagination.LX : UiPagination.SX })
                .then(setOrders)
                .catch(errorToast);
        },
        [errorToast],
    );

    useEffect(() => {
        ordersEvent.listen(fetchData);
        return () => ordersEvent.clear(fetchData);
    }, [fetchData]);

    const nextPage = useCallback(() => {
        if (orders.currentPage < orders.totalPages) {
            ordersService
                .getOrder({ status: OrderStatus.PENDING, page: orders.currentPage + 1, limit: orders.limit })
                .then(setOrders)
                .catch(errorToast);
        }
    }, [errorToast, orders.currentPage, orders.limit, orders.totalPages]);

    const value = useMemo(
        () => ({
            fetchData,
            orders,
            nextPage,
        }),
        [fetchData, nextPage, orders],
    );

    return <NewOrdersContext.Provider value={value}>{children}</NewOrdersContext.Provider>;
};

export const useNewOrdersContext = (): NewOrdersContextType => {
    return useContext(NewOrdersContext);
};
