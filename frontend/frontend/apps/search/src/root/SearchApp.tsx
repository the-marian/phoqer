import { FC, lazy, Suspense } from 'react';

import { Center, Spinner } from '@chakra-ui/react';
import { Outlet, Route, Routes, BrowserRouter } from 'react-router-dom';

const SearchPage = lazy(() => import('../pages').then(module => ({ default: module.SearchPage })));

const PageWrapper: FC = () => {
    return (
        <Suspense
            fallback={
                <Center flex={1} h="100%" w="100%">
                    <Spinner size="sm" />
                </Center>
            }
        >
            <Outlet />
        </Suspense>
    );
};

export const SearchApp: FC = () => {
    return (
        <BrowserRouter basename="search">
            <Routes>
                <Route path="" element={<PageWrapper />}>
                    <Route path="" element={<SearchPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
