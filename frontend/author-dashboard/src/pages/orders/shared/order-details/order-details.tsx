import React from 'react';

import { Order, OrderStatus, OrderTimer } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { Actions } from 'src/pages/orders/shared/order-details/actions/actions';
import { Table } from 'src/pages/orders/shared/order-details/table/table';

import css from './order-details.module.scss';

interface Props {
    order: Order;
    onClose?: () => void;
}
export const OrderDetails = ({ order, onClose }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();

    return (
        <div className={css.inner}>
            {order.status === OrderStatus.IN_PROGRESS && (
                <div className={css.start}>
                    <OrderTimer order={order} locale={i18n.language} label={t('time has passed')} />
                </div>
            )}

            <Actions order={order} onClose={onClose} />

            <Table order={order} />
        </div>
    );
};
