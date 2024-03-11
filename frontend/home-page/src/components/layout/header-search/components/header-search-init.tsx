import { FC } from 'react';

import { EmptyState, Text, Heading } from 'phoqer';

import { useTranslation } from '@app/hook/translations.hook';

import css from './header-search-tabs.module.scss';

export const HeaderSearchInit: FC = () => {
    const { t } = useTranslation();

    return (
        <EmptyState type="form" className={css.empty}>
            <Heading as="h2" size="sm">
                {t('Start typing')}
            </Heading>
            <Text size="sm">{t('What are you looking for?')}</Text>
        </EmptyState>
    );
};
