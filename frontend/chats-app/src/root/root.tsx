import React from 'react';

import { ToastProvider, LargeModalHeader } from 'phoqer';
import { ReduceAnimationsProvider, Appear, chatsPage } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LanguageRedirect } from 'src/components/language/language';
import { Pages } from 'src/pages/pages';

import css from './root.module.scss';

export const Root = (): JSX.Element => {
    const { t, i18n } = useTranslation();

    return (
        <ToastProvider>
            <ReduceAnimationsProvider>
                <BrowserRouter>
                    <Appear className={css.root}>
                        <LargeModalHeader title={t('Done')} onClose={() => chatsPage.close(i18n.language)} />

                        <Routes>
                            <Route path=":language" element={<LanguageRedirect />}>
                                <Route path="chats/*" element={<Pages />} />
                            </Route>
                        </Routes>
                    </Appear>
                </BrowserRouter>
            </ReduceAnimationsProvider>
        </ToastProvider>
    );
};
