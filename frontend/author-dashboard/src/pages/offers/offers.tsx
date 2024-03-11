import React, { lazy, Suspense } from 'react';

import { Loader, Switch, TableContextProvider, useMedia } from 'phoqer';
import { useReduceAnimations } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import { SubHeader } from 'src/components/sub-header/sub-header';
import { OffersContext as OffersContextProvider } from 'src/context/offers.context';

import css from './offers.module.scss';

const Desktop = lazy(() => import('./desktop/desktop'));
const Mobile = lazy(() => import('./mobile/mobile'));

const OffersPage = (): JSX.Element => {
    const { t } = useTranslation();
    const isMobile = useMedia(1300);
    const { isReduceAnimations, toggleIsReduceAnimations } = useReduceAnimations();

    return (
        <div className={css.root}>
            <SubHeader>
                <h3 className={css.title}>{t('Your offers')}</h3>

                <div className={css.switch}>
                    <Switch checked={isReduceAnimations} onChange={toggleIsReduceAnimations} label={t('Reduce animations')} />
                </div>
            </SubHeader>

            <OffersContextProvider>
                <TableContextProvider>
                    <Suspense fallback={<Loader />}>{isMobile ? <Mobile /> : <Desktop />}</Suspense>
                </TableContextProvider>
            </OffersContextProvider>
        </div>
    );
};

export default OffersPage;
