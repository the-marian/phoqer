import { useRouter } from 'next/router';

import { vocabulary } from '@app/assets/translations';
import { IVocabulary, LANGUAGE_ENUM } from '@app/types/language.type';

type Translate = (value?: string, dynamic?: Record<string, string | number>) => string;
type TranslationType = {
    t: Translate;
    locale: LANGUAGE_ENUM;
};

export const useTranslation = (): TranslationType => {
    const router = useRouter();

    const t: Translate = (value, dynamic): string => {
        const transition =
            (vocabulary as IVocabulary)?.[(router.locale as LANGUAGE_ENUM) || LANGUAGE_ENUM.EN][value || ''] ||
            String(value || '');

        if (dynamic) {
            return Object.entries(dynamic).reduce(
                (acc, [key, value]) => acc.replace(new RegExp(`{{${key}}}`, 'gi'), value.toString()),
                transition,
            );
        }

        return transition;
    };

    return { t, locale: (router.locale as LANGUAGE_ENUM) || LANGUAGE_ENUM.EN };
};
