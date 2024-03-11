import React from 'react';

import { ToastProvider } from 'phoqer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DefaultLanguage, Language } from 'src/components/language/language';
import { Pages } from 'src/pages/pages';

export const Root = (): JSX.Element => {
    return (
        <ToastProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<DefaultLanguage />}>
                        <Route index element={<Pages />} />
                    </Route>

                    <Route path=":language" element={<Language />}>
                        <Route index element={<Pages />} />
                        <Route path="*" element={<Pages />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ToastProvider>
    );
};
