import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { LANGUAGE_ENUM } from 'src/types/language.type';

type ChangeLocale = (locale?: string) => void;
export const useChangeLocale = (): ChangeLocale => {
    const { i18n } = useTranslation();

    const navigation = useNavigate();
    const { language } = useParams();
    const { pathname } = useLocation();

    return (locale = LANGUAGE_ENUM.EN) => {
        const newPathname = pathname.replace(language || LANGUAGE_ENUM.EN, locale);

        navigation(newPathname);
        i18n.changeLanguage(locale);
    };
};
