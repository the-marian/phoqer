import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router-dom';

import { LANGUAGE_ENUM } from 'src/types/language.type';

const languages: string[] = [LANGUAGE_ENUM.UA, LANGUAGE_ENUM.EN, LANGUAGE_ENUM.PL];

export const Language = (): JSX.Element => {
    const { i18n } = useTranslation();
    const { language } = useParams();

    useEffect(() => {
        i18n.changeLanguage(languages.includes(language as string) ? language : LANGUAGE_ENUM.EN);
    }, [i18n, language]);

    return <Outlet />;
};

export const DefaultLanguage = (): JSX.Element => {
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(LANGUAGE_ENUM.EN);
    }, [i18n]);

    return <Outlet />;
};
