import { FC, lazy, Suspense } from 'react';

import { Center, Spinner } from '@chakra-ui/react';
import { Outlet, Route, Routes, BrowserRouter } from 'react-router-dom';

const Login = lazy(() => import('../pages').then(module => ({ default: module.Login })));
const SignIn = lazy(() => import('../pages').then(module => ({ default: module.SignIn })));

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

export const AuthApp: FC = () => {
    return (
        <BrowserRouter basename="auth">
            <Routes>
                <Route path="" element={<PageWrapper />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signin" element={<SignIn />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
