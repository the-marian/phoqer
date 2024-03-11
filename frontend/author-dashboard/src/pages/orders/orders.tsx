import React, { lazy, Suspense } from 'react';

import { Switch, TableContextProvider, Loader, useMedia } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { OrdersContext as OrdersContextProvider } from 'src/context/orders.context';

import css from './orders.module.scss';

const Desktop = lazy(() => import('./desktop/desktop'));
const Mobile = lazy(() => import('./mobile/mobile'));

const OrdersPage = (): JSX.Element => {
    const { t } = useTranslation();
    const isMobile = useMedia(1300);
    const { isReduceAnimations, toggleIsReduceAnimations } = useReduceAnimations();

    return (
        <div className={css.root}>
            <SubHeader>
                <h3 className={css.title}>{t('Your rent requests')}</h3>

                <div className={css.switch}>
                    <Switch checked={isReduceAnimations} onChange={toggleIsReduceAnimations} label={t('Reduce animations')} />
                </div>
            </SubHeader>

            <OrdersContextProvider>
                <TableContextProvider>
                    <Suspense fallback={<Loader />}>
                        <Suspense fallback={<Loader />}>{isMobile ? <Mobile /> : <Desktop />}</Suspense>
                    </Suspense>
                </TableContextProvider>
            </OrdersContextProvider>
        </div>
    );
};

export default OrdersPage;
