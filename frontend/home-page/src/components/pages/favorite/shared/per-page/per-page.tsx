import { FC } from 'react';

import { Select, SelectOption } from 'phoqer';

import { useFavoriteContext } from '@app/context/favorite.context';
import { useTranslation } from '@app/hook/translations.hook';

import css from './per-page.module.scss';

export const PerPage: FC = () => {
    const { t } = useTranslation();
    const { perPage, setPerPage } = useFavoriteContext();

    return (
        <div className={css.root}>
            <Select size="sm" label={t('Select items per page')} value={perPage} onSelect={setPerPage}>
                <SelectOption size="sm" value={10}>
                    1 - 10
                </SelectOption>
                <SelectOption size="sm" value={15}>
                    1 - 15
                </SelectOption>
                <SelectOption size="sm" value={25}>
                    1 - 25
                </SelectOption>
                <SelectOption size="sm" value={30}>
                    1 - 30
                </SelectOption>
                <SelectOption size="sm" value={50}>
                    1 - 50
                </SelectOption>
            </Select>
        </div>
    );
};
