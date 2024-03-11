import React from 'react';

import classNames from 'classnames';
import { useTableContext } from 'phoqer';
import { useOrdersContext, StickyContainer } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { KeyboardShortcuts } from 'src/pages/orders/desktop/keyboard-shortcuts/keyboard-shortcuts';
import { StatusTabs } from 'src/pages/orders/shared/status-tabs/status-tabs';

import { ChangePage } from '../../shared/change-page/change-page';
import { PerPage } from '../../shared/per-page/per-page';
import { RefreshTable } from '../../shared/refresh-table/refresh-table';

import { BulkReject } from './bulk-reject/bulk-reject';
import { BulkResend } from './bulk-resend/bulk-resend';
import css from './table-header.module.scss';

export const TableHeader = (): JSX.Element => {
    const { t } = useTranslation();
    const { orders } = useOrdersContext();
    const { selected } = useTableContext();

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
                        <p className={classNames(css.mr2, css.text)}>
                            {t('Total items: {{amount}}', { amount: orders.totalItems })}
                        </p>
                        <p className={classNames(css.mr2, css.text)}>{t('Selected: {{amount}}', { amount: selected.length })}</p>

                        <BulkResend />
                        <BulkReject />
                        <RefreshTable />
                    </div>
                </div>
            </StickyContainer>
        </>
    );
};
