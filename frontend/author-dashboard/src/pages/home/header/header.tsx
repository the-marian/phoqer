import React from 'react';

import { Text, Title, TypographySize } from 'phoqer';
import { useTranslation } from 'react-i18next';

import css from './header.module.scss';

export const Header = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={css.flex}>
            <div className={css.inner}>
                <Title size={TypographySize.LG}>{t('Welcome to Phoqer')}</Title>
                <Text className={css.text}>{t('Here is a brief information for you')}</Text>
            </div>
        </div>
    );
};
