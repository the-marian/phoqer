import React from 'react';

import { Text, TypographySize, useTableContext } from 'phoqer';
import { useOffersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { ChangePage } from 'src/pages/offers/shared/change-page/change-page';
import { PerPage } from 'src/pages/offers/shared/per-page/per-page';
import { RefreshTable } from 'src/pages/orders/shared/refresh-table/refresh-table';
import css from 'src/shared/table-header.module.scss';

export const Pagination = (): JSX.Element => {
    const { t } = useTranslation();
    const { selected } = useTableContext();
    const { offers, currentPage, setCurrentPage } = useOffersContext();

    return (
        <div className={css.header}>
            <div className={css.inner}>
                <ChangePage />
                <PerPage />
            </div>

            <div className={css.inner}>
                <Text size={TypographySize.SM} className={css.mr2}>
                    {t('Total items: {{amount}}', { amount: offers.totalItems })}
                </Text>
                <Text size={TypographySize.SM} className={css.mr2}>
                    {t('Selected: {{amount}}', { amount: selected.length })}
                </Text>

                <RefreshTable currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    );
};
