import React, { ReactNode } from 'react';

import { OrdersContextProvider } from 'phoqer-shared';

import { useErrorToast } from 'src/hook/error-toast.hook';
import { ordersService } from 'src/services/orders.service';

interface Props {
    children: ReactNode;
}
export const OrdersContext = ({ children }: Props): JSX.Element => {
    const errorToast = useErrorToast();

    return (
        <OrdersContextProvider http={ordersService.getOrder} onError={errorToast}>
            {children}
        </OrdersContextProvider>
    );
};
