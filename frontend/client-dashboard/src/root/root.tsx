import React from 'react';

import classNames from 'classnames';
import { ToastProvider } from 'phoqer';
import { ReduceAnimationsProvider } from 'phoqer-shared';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LanguageRedirect } from 'src/components/language-redirect/language-redirect';
import { UserInfoContextProvider } from 'src/context/user-info.context';
import { Pages } from 'src/pages/pages';

import css from './root.module.scss';

export const Root = (): JSX.Element => {
    return (
        <ReduceAnimationsProvider>
            <UserInfoContextProvider>
                <ToastProvider>
                    <BrowserRouter>
                        <div className={classNames(css.root, process.env.NODE_ENV === 'development' && css.development)}>
                            <Routes>
                                <Route path=":language" element={<LanguageRedirect />}>
                                    <Route path="*" element={<Pages />} />
                                </Route>
                            </Routes>
                        </div>
                    </BrowserRouter>
                </ToastProvider>
            </UserInfoContextProvider>
        </ReduceAnimationsProvider>
    );
};
