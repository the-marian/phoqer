import { FC } from 'react';

import { About as AboutPhoqer } from 'phoqer';

import { useTranslation } from '@app/hook/translations.hook';

export const About: FC = () => {
    const { t } = useTranslation();
    return (
        <AboutPhoqer
            src="/about.jpeg"
            description={t('Is an online advertising platform that brings people together to exchange goods and services')}
        />
    );
};
