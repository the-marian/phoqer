import { lazy, Suspense } from 'react';

import { Loader } from 'phoqer';
import { useLocation } from 'react-router-dom';

import { Hash } from 'src/constants/hash.constants';

const AuthPage = lazy(() => import('./auth/auth'));
const ForgotPage = lazy(() => import('./forgot/forgot'));

const pagesMap: { [key: string]: JSX.Element } = {
    [Hash.Auth]: <AuthPage />,
    [Hash.Forgot]: <ForgotPage />,
};

export const Pages = (): JSX.Element => {
    const location = useLocation();

    return <Suspense fallback={<Loader fixed />}>{pagesMap[location.hash] || pagesMap[Hash.Auth]}</Suspense>;
};
