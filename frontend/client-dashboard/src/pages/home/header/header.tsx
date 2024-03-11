import React from 'react';

import { useTranslation } from 'react-i18next';

import css from './header.module.scss';

export const Header = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className={css.flex}>
            <div className={css.inner}>
                <h1 className={css.title}>{t('Welcome to Phoqer')}</h1>
                <p className={css.text}>{t('Here is a brief information for you')}</p>
            </div>
        </div>
    );
};
