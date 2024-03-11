import React from 'react';

import { LargeModal, LargeModalHeader, Order } from 'phoqer';
import { useTranslation } from 'react-i18next';

import { OrderDetails } from 'src/pages/orders/shared/order-details/order-details';

import { Carousel } from './carousel/carousel';
import css from './order-modal.module.scss';

interface Props {
    order: Order | null;
    onClose: () => void;
}
const OrderModal = ({ order, onClose }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <LargeModal
            onClose={onClose}
            open={Boolean(order)}
            header={<LargeModalHeader title={t('Back to orders')} onClose={onClose} autoFocus />}
        >
            {order && (
                <div className={css.root}>
                    <div className={css.scroll}>
                        <Carousel images={order.images} title={order.title} />
                        <OrderDetails order={order} onClose={onClose} />
                    </div>
                </div>
            )}
        </LargeModal>
    );
};

export default OrderModal;
