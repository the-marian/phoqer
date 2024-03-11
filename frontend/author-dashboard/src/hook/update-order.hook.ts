import { ID, OrderStatus } from 'phoqer';
import { useOrdersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useErrorToast } from 'src/hook/error-toast.hook';
import { useSuccessToast } from 'src/hook/success-toast.hook';
import { ordersService } from 'src/services/orders.service';

type UpdateOrderType = (ids: ID[], status: OrderStatus) => Promise<void>;
export const useUpdateOrder = (): UpdateOrderType => {
    const { t } = useTranslation();
    const errorToast = useErrorToast();
    const successToast = useSuccessToast();
    const { updateOrders } = useOrdersContext();

    return (ids, status): Promise<void> => {
        return ordersService
            .updateOrder(ids, status)
            .then(data => {
                data.forEach(updateOrders);
                successToast(t('You have successfully update your order'));
            })
            .catch(errorToast);
    };
};
