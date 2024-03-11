import { lazy, Suspense } from 'react';

import { Loader } from 'phoqer';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./home/home'));
const OrdersPage = lazy(() => import('./orders/orders'));
const SettingsPage = lazy(() => import('./settings/settings'));
const NotFound = lazy(() => import('./not-found/not-found'));

export const Pages = (): JSX.Element => {
    return (
        <Suspense fallback={<Loader fixed />}>
            <Routes>
                <Route path="/client" element={<HomePage />} />
                <Route path="/client/orders" element={<OrdersPage />} />
                <Route path="/client/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};
