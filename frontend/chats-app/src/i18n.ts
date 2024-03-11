import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { env } from 'src/config/env.config';
import { LANGUAGE_ENUM } from 'src/types/language.type';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath:
                process.env.NODE_ENV === 'production'
                    ? `${env.PHOQER_APP_HOST}/locales/{{lng}}/{{ns}}.json`
                    : '/locales/{{lng}}/{{ns}}.json',
        },

        fallbackLng: LANGUAGE_ENUM.EN,
        supportedLngs: [LANGUAGE_ENUM.EN, LANGUAGE_ENUM.PL, LANGUAGE_ENUM.UA],
        debug: false,

        interpolation: {
            escapeValue: false,
        },

        react: {
            bindI18n: 'languageChanged',
            bindI18nStore: '',
            transEmptyNodeValue: '',
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
            useSuspense: true,
        },
    });

export default i18n;
