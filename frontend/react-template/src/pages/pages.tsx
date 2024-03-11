import { lazy, Suspense } from 'react';

import { Loader } from 'phoqer';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./home/home'));

export const Pages = (): JSX.Element => {
    return (
        <Suspense fallback={<Loader fixed />}>
            <Routes>
                <Route path="*" element={<HomePage />} />
            </Routes>
        </Suspense>
    );
};
