import { FC } from 'react';

import { Select, SelectOption } from 'phoqer';

import { useFavoriteContext } from '@app/context/favorite.context';
import { useTranslation } from '@app/hook/translations.hook';

import css from './change-page.module.scss';

export const ChangePage: FC = () => {
    const { t } = useTranslation();
    const { setCurrentPage, currentPage, favorite } = useFavoriteContext();

    const handleClick = (value: number): void => {
        setCurrentPage(value);
    };

    return (
        <div className={css.root}>
            <Select
                size="sm"
                value={currentPage}
                onSelect={handleClick}
                label={t('Current page: {{page}}', { page: currentPage })}
            >
                {[...Array(favorite.totalPages || 1)].map((_, index) => (
                    <SelectOption key={index} size="sm" value={index + 1}>
                        {index + 1}
                    </SelectOption>
                ))}
            </Select>
        </div>
    );
};
