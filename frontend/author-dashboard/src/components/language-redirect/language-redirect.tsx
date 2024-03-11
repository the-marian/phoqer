import React, { useEffect } from 'react';

import { changeLocale } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useParams, Outlet } from 'react-router-dom';

import { useChangeLocale } from 'src/hook/change-locale.hook';
import { LANGUAGE_ENUM } from 'src/types/language.type';

const languages: string[] = [LANGUAGE_ENUM.EN, LANGUAGE_ENUM.UA, LANGUAGE_ENUM.PL];

export const LanguageRedirect = (): JSX.Element => {
    const { i18n } = useTranslation();
    const { language } = useParams();
    const { pathname } = useLocation();
    const changeLanguage = useChangeLocale();

    useEffect(() => {
        const handler = ({ detail }: CustomEvent<string>): void => {
            changeLanguage(detail);
        };

        changeLocale.subscribe(handler as EventListener);
        return () => {
            changeLocale.unsubscribe(handler as EventListener);
        };
    }, [i18n, changeLanguage]);

    if (!languages.includes(language || '')) {
        return <Navigate to={`/${LANGUAGE_ENUM.EN}${pathname}`} replace />;
    }

    return <Outlet />;
};
