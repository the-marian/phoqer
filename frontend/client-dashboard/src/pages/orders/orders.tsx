import React, { Suspense, lazy } from 'react';

import { Switch, TableContextProvider, useMedia, Loader } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { OrdersContext as OrdersContextProvider } from 'src/context/orders.context';
import { ResendOrderContextProvider } from 'src/context/resend-order.context';

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
                <h3 className={css.title}>{t("Requests you've sent")}</h3>

                <div className={css.switch}>
                    <Switch checked={isReduceAnimations} onChange={toggleIsReduceAnimations} label={t('Reduce animations')} />
                </div>
            </SubHeader>

            <OrdersContextProvider>
                <TableContextProvider>
                    <ResendOrderContextProvider>
                        <Suspense fallback={<Loader />}>{isMobile ? <Mobile /> : <Desktop />}</Suspense>
                    </ResendOrderContextProvider>
                </TableContextProvider>
            </OrdersContextProvider>
        </div>
    );
};

export default OrdersPage;
