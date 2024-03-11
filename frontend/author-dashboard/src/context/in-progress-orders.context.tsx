import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { OrdersList, OrderStatus } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';

import { UiPagination } from 'src/config/ui.config';
import { useErrorToast } from 'src/hook/error-toast.hook';
import { ordersService } from 'src/services/orders.service';
import { isTablet } from 'src/utils/media.utils';
import { ordersEvent } from 'src/utils/orders.utils';

interface InProgressOrdersContextType {
    orders: OrdersList;
    nextPage: () => void;
    fetchData: (params?: Record<string, string | number>) => Promise<void>;
}

export const InProgressOrdersContext = createContext<InProgressOrdersContextType>({} as InProgressOrdersContextType);

interface Props {
    children: ReactNode;
}
export const StartedOrdersProvider = ({ children }: Props): JSX.Element => {
    const errorToast = useErrorToast();
    const [orders, setOrders] = useState<OrdersList>(getEmptyPagination());

    const fetchData = useCallback(
        (params: Record<string, string | number> = {}) => {
            return ordersService
                .getOrder({ ...params, status: OrderStatus.IN_PROGRESS, limit: isTablet ? UiPagination.LX : UiPagination.SX })
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
                .getOrder({
                    limit: orders.limit,
                    page: orders.currentPage + 1,
                    status: OrderStatus.IN_PROGRESS,
                })
                .then(setOrders)
                .catch(errorToast);
        }
    }, [errorToast, orders.currentPage, orders.limit, orders.totalPages]);

    const value = useMemo(
        () => ({
            orders,
            nextPage,
            fetchData,
        }),
        [fetchData, nextPage, orders],
    );

    return <InProgressOrdersContext.Provider value={value}>{children}</InProgressOrdersContext.Provider>;
};

export const useInProgressOrdersContext = (): InProgressOrdersContextType => {
    return useContext(InProgressOrdersContext);
};
