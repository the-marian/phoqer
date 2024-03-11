import React, { useEffect, useState } from 'react';

import { OrdersList, OrderStatus } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { UiPagination } from 'src/config/ui.config';
import { useErrorToast } from 'src/hook/error-toast.hook';
import { OrdersPreview } from 'src/pages/home/shared/orders-preview';
import { ordersService } from 'src/services/orders.service';
import { isTablet } from 'src/utils/media.utils';

export const AcceptedOrders = (): JSX.Element => {
    const { t } = useTranslation();
    const errorToast = useErrorToast();

    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<OrdersList>(getEmptyPagination);

    useEffect(() => {
        ordersService
            .getOrders({ status: OrderStatus.ACCEPTED, limit: isTablet ? UiPagination.LX : UiPagination.SX })
            .then(setOrders)
            .catch(errorToast)
            .finally(() => setIsLoading(false));
    }, [errorToast]);

    return <OrdersPreview isLoading={isLoading} orders={orders} title={t('Not started. Pending for author')} />;
};
