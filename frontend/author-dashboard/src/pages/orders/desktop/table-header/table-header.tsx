import React from 'react';

import { useTableContext, OrderStatus, Text, TypographySize } from 'phoqer';
import { useOrdersContext, StickyContainer } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { KeyboardShortcuts } from 'src/components/keyboard-shortcuts/keyboard-shortcuts';
import { BulkDone } from 'src/pages/orders/desktop/table-header/bulk-done/bulk-done';
import { ChangePage } from 'src/pages/orders/shared/change-page/change-page';
import { PerPage } from 'src/pages/orders/shared/per-page/per-page';
import { RefreshTable } from 'src/pages/orders/shared/refresh-table/refresh-table';
import { StatusTabs } from 'src/pages/orders/shared/status-tabs/status-tabs';

import { BulkActivate } from './bulk-activate/bulk-activate';
import { BulkReject } from './bulk-reject/bulk-reject';
import css from './table-header.module.scss';

export const TableHeader = (): JSX.Element => {
    const { t } = useTranslation();
    const { selected } = useTableContext();
    const { orders, status, currentPage, setCurrentPage } = useOrdersContext();

    const canAccept = status === OrderStatus.PENDING || status === OrderStatus.REJECTED;
    const canReject = status === OrderStatus.PENDING || status === OrderStatus.ACCEPTED;
    const canDone = status === OrderStatus.ACCEPTED;

    return (
        <>
            <StickyContainer zIndex={12} className={css.root}>
                <div className={css.header}>
                    <StatusTabs />
                    <KeyboardShortcuts />
                </div>
            </StickyContainer>
            <StickyContainer zIndex={11} className={css.root}>
                <div className={css.header}>
                    <div className={css.inner}>
                        <ChangePage />
                        <PerPage />
                    </div>

                    <div className={css.inner}>
                        <Text size={TypographySize.SM} className={css.mr2}>
                            {t('Total items: {{amount}}', { amount: orders.totalItems })}
                        </Text>
                        <Text size={TypographySize.SM} className={css.mr2}>
                            {t('Selected: {{amount}}', { amount: selected.length })}
                        </Text>

                        {canAccept && <BulkActivate />}
                        {canReject && <BulkReject />}
                        {canDone && <BulkDone />}

                        <RefreshTable currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </StickyContainer>
        </>
    );
};
