import { FC, lazy, Suspense } from 'react';

import { Center, Spinner } from '@chakra-ui/react';
import { Outlet, Route, Routes, BrowserRouter } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages').then(module => ({ default: module.Dashboard })));

const NewOffer = lazy(() => import('../pages').then(module => ({ default: module.NewOffer })));
const Offers = lazy(() => import('../pages').then(module => ({ default: module.Offers })));

const PageWrapper: FC = () => {
    return (
        <Suspense
            fallback={
                <Center flex={1} h="100vh" w="100%">
                    <Spinner size="sm" />
                </Center>
            }
        >
            <Outlet />
        </Suspense>
    );
};

export const AuthorApp: FC = () => {
    return (
        <BrowserRouter basename="author">
            <Routes>
                <Route path="" element={<PageWrapper />}>
                    <Route path="" element={<Dashboard />} />
                    <Route path="/offers">
                        <Route index element={<Offers />} />
                        <Route path="new" element={<NewOffer />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
