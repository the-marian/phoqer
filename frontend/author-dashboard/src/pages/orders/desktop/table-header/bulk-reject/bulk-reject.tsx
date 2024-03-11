import React, { useMemo } from 'react';

import { Button, AlertIcon, useTableContext, OrderStatus, ID } from 'phoqer';
import { useOrdersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useUpdateOrder } from 'src/hook/update-order.hook';

import css from './bulk-reject.module.scss';

export const BulkReject = (): JSX.Element => {
    const { t } = useTranslation();
    const { selected, unselectAll } = useTableContext();
    const { loading, orders } = useOrdersContext();

    const ids = useMemo(() => {
        return selected.reduce<ID[]>((acc, index) => {
            const { status, id } = orders.data[index];

            // user can select orders with different statuses
            if (status === OrderStatus.PENDING || status === OrderStatus.ACCEPTED) {
                acc.push(id);
            }
            return acc;
        }, []);
    }, [selected, orders.data]);

    const updateOrder = useUpdateOrder();
    const handleReject = (): void => {
        updateOrder(ids, OrderStatus.REJECTED).then(unselectAll);
    };

    return (
        <Button disabled={loading || !ids.length} className={css.mr2} onClick={handleReject}>
            {t('Reject selected orders')}
            <AlertIcon />
        </Button>
    );
};
