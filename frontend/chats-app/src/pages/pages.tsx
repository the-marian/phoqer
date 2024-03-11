import { lazy, Suspense } from 'react';

import { Loader } from 'phoqer';
import { Routes, Route } from 'react-router-dom';

const ChatsPage = lazy(() => import('./chats/chats'));

export const Pages = (): JSX.Element => {
    return (
        <Suspense fallback={<Loader fixed />}>
            <Routes>
                <Route path=":chatId" element={<ChatsPage />} />
                <Route path="*" element={<ChatsPage />} />
            </Routes>
        </Suspense>
    );
};
