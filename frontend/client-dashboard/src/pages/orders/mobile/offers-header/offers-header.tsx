import React from 'react';

import classNames from 'classnames';
import { Container, Text, TypographySize, useTableContext } from 'phoqer';
import { useOrdersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { ChangePage } from 'src/pages/orders/shared/change-page/change-page';
import { PerPage } from 'src/pages/orders/shared/per-page/per-page';
import { RefreshTable } from 'src/pages/orders/shared/refresh-table/refresh-table';
import { StatusTabs } from 'src/pages/orders/shared/status-tabs/status-tabs';

import css from './offers-header.module.scss';

export const OffersHeader = (): JSX.Element => {
    const { t } = useTranslation();
    const { orders } = useOrdersContext();
    const { selected } = useTableContext();

    return (
        <>
            <div className={classNames(css.my, css.status)}>
                <StatusTabs />
            </div>

            <Container className={css.my}>
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

                        <RefreshTable />
                    </div>
                </div>
            </Container>
        </>
    );
};
