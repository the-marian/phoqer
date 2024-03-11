import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { Button, Scroll, ChevronRightIcon, OrdersList, ID, CardLoader } from 'phoqer';
import { getEmptyPagination } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Backdrop } from 'src/components/backdrop/backdrop';
import { ChatHead } from 'src/components/chat-head/chat-head';
import { OrderItem } from 'src/components/order-item/order-item';
import { useErrorToast } from 'src/hook/error-toast.hook';
import { ordersService } from 'src/services/orders.service';

import css from './orders.module.scss';

interface Props {
    open: boolean;
    onClose: () => void;
}
export const Orders = ({ open, onClose }: Props): JSX.Element => {
    const { t } = useTranslation();
    const errorToast = useErrorToast();

    const { chatId } = useParams();

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<OrdersList>(getEmptyPagination);

    const [activeOrder, setActiveOrder] = useState<null | ID>(null);

    useEffect(() => {
        if (chatId && open) {
            setLoading(true);
            ordersService
                .getOrders(chatId)
                .then(setOrders)
                .catch(errorToast)
                .finally(() => setLoading(false));
        }
    }, [errorToast, chatId, open]);

    useEffect(() => {
        const handleClose = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleClose);
        return () => window.removeEventListener('keydown', handleClose);
    }, [onClose]);

    return (
        <>
            <Backdrop open={open} onClick={onClose} />

            <div className={classNames(css.orders, open && css.open)}>
                <Scroll className={css.scroll}>
                    <div className={css.inner}>
                        <ChatHead>
                            <Button onClick={onClose} className={css.back}>
                                {t('Close')}
                                <ChevronRightIcon />
                            </Button>

                            {t('Orders')}
                        </ChatHead>

                        <div className={css.content}>
                            {loading ? (
                                <CardLoader showStatus />
                            ) : (
                                orders.data.map(order => (
                                    <OrderItem
                                        key={order.id}
                                        order={order}
                                        activeOrder={activeOrder}
                                        setActiveOrder={setActiveOrder}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </Scroll>
            </div>
        </>
    );
};
