import React, { useMemo } from 'react';

import { Button, HappyIcon, useTableContext, OrderStatus, ID } from 'phoqer';
import { useOrdersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { useUpdateOrder } from 'src/hook/update-order.hook';

import css from './bulk-done.module.scss';

export const BulkDone = (): JSX.Element => {
    const { t } = useTranslation();
    const { selected, unselectAll } = useTableContext();
    const { loading, orders } = useOrdersContext();

    const ids = useMemo(() => {
        return selected.reduce<ID[]>((acc, index) => {
            const { status, id } = orders.data[index];

            // user can select orders with different statuses
            if (status === OrderStatus.ACCEPTED) {
                acc.push(id);
            }
            return acc;
        }, []);
    }, [selected, orders.data]);

    const updateOrder = useUpdateOrder();
    const handleDone = (): void => {
        updateOrder(ids, OrderStatus.DONE).then(unselectAll);
    };

    return (
        <Button disabled={loading || !ids.length} className={css.mr2} onClick={handleDone}>
            {t('Mark as Done')}
            <HappyIcon />
        </Button>
    );
};
