import React from 'react';

import { Order } from 'phoqer';

import { Actions } from 'src/pages/orders/shared/order-details/actions/actions';
import { Table } from 'src/pages/orders/shared/order-details/table/table';

import css from './order-details.module.scss';

interface Props {
    order: Order;
    onClose?: () => void;
}
export const OrderDetails = ({ order, onClose }: Props): JSX.Element => {
    return (
        <div className={css.root}>
            <Actions order={order} onClose={onClose} />
            <Table order={order} />
        </div>
    );
};
