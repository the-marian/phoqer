import { FC } from 'react';

import { Text } from 'phoqer';
import { StickyContainer } from 'phoqer-shared';

import { ChangePage } from '@app/components/pages/favorite/shared/change-page/change-page';
import { PerPage } from '@app/components/pages/favorite/shared/per-page/per-page';
import { useFavoriteContext } from '@app/context/favorite.context';
import { useTranslation } from '@app/hook/translations.hook';

import css from './table-header.module.scss';

export const TableHeader: FC = () => {
    const { t } = useTranslation();
    const { favorite } = useFavoriteContext();

    return (
        <StickyContainer zIndex={11} className={css.root}>
            <div className={css.header}>
                <div className={css.inner}>
                    <ChangePage />
                    <PerPage />
                </div>

                <div className={css.inner}>
                    <Text size="sm">{t('Total items: {{amount}}', { amount: favorite.totalItems })}</Text>
                </div>
            </div>
        </StickyContainer>
    );
};
