import { lazy, Suspense } from 'react';

import { Loader } from 'phoqer';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./home/home'));
const NewOfferPage = lazy(() => import('./new-offer/new-offer'));
const OrdersPage = lazy(() => import('./orders/orders'));
const OfferPage = lazy(() => import('./offers/offers'));
const EditOffer = lazy(() => import('./edit-offer/edit-offer'));
const NotFound = lazy(() => import('./not-found/not-found'));

export const Pages = (): JSX.Element => {
    return (
        <Suspense fallback={<Loader fixed />}>
            <Routes>
                <Route path="/author" element={<HomePage />} />
                <Route path="/author/new-offer" element={<NewOfferPage />} />
                <Route path="/author/orders" element={<OrdersPage />} />
                <Route path="/author/offers" element={<OfferPage />} />
                <Route path="/author/offers/:offerId" element={<EditOffer />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};
