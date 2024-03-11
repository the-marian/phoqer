import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { OrdersList, OrderStatus } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';

import { UiPagination } from 'src/config/ui.config';
import { useErrorToast } from 'src/hook/error-toast.hook';
import { ordersService } from 'src/services/orders.service';
import { isTablet } from 'src/utils/media.utils';
import { ordersEvent } from 'src/utils/orders.utils';

interface AcceptedOrdersContextType {
    orders: OrdersList;
    nextPage: () => void;
    fetchData: (params?: Record<string, string | number>) => Promise<void>;
}

export const AcceptedOrdersContext = createContext<AcceptedOrdersContextType>({} as AcceptedOrdersContextType);

interface Props {
    children: ReactNode;
}
export const AcceptedOrdersProvider = ({ children }: Props): JSX.Element => {
    const errorToast = useErrorToast();
    const [orders, setOrders] = useState<OrdersList>(getEmptyPagination());

    const fetchData = useCallback(
        (params: Record<string, string | number> = {}) => {
            return ordersService
                .getOrder({ ...params, status: OrderStatus.ACCEPTED, limit: isTablet ? UiPagination.LX : UiPagination.SX })
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
                    status: OrderStatus.ACCEPTED,
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

    return <AcceptedOrdersContext.Provider value={value}>{children}</AcceptedOrdersContext.Provider>;
};

export const useAcceptedOrdersContext = (): AcceptedOrdersContextType => {
    return useContext(AcceptedOrdersContext);
};
