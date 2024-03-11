import React, { useCallback, useState } from 'react';

import { Container, CardLoader, Card, ID, Button, Flex } from 'phoqer';
import { useOrdersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { EmptyState } from 'src/components/empty-state/empty-state';
import { useStatusText } from 'src/hook/status-text.hook';
import { OrderDetails } from 'src/pages/orders/shared/order-details/order-details';

import css from './orders-list.module.scss';

export const OrdersList = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const statusLocale = useStatusText();
    const { loading, orders, currentPage, setCurrentPage, loadMore } = useOrdersContext();
    const [activeOrder, setActiveOrder] = useState<ID | null>(null);

    const handleClose = useCallback(() => {
        setActiveOrder(null);
    }, []);

    return (
        <Container className={css.mt}>
            {loading ? (
                <CardLoader />
            ) : orders.data.length ? (
                orders.data.map(order => (
                    <Card
                        key={order.id}
                        value={order}
                        locale={i18n.language}
                        statusLocale={statusLocale}
                        isActive={activeOrder === order.id}
                        onClick={() => setActiveOrder(activeOrder === order.id ? null : order.id)}
                    >
                        <OrderDetails order={order} onClose={handleClose} />
                    </Card>
                ))
            ) : (
                <EmptyState currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}

            {orders.currentPage < orders.totalPages && (
                <Flex align="center" justify="center" className={css.mt}>
                    <Button outline loading={loading} onClick={loadMore}>
                        {t('Load more items')}
                    </Button>
                </Flex>
            )}
        </Container>
    );
};
