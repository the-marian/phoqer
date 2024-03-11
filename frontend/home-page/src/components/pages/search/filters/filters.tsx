import { FC } from 'react';

import { useRouter } from 'next/router';
import { Switch } from 'phoqer';

import { Prices } from '@app/components/pages/search/filters/prices';
import { useTranslation } from '@app/hook/translations.hook';
import { queryParams } from '@app/utils/query-params';

import { Categories } from './categories';
import css from './filters.module.scss';
import { Group } from './group';
import { Search } from './search';

export const Filters: FC = () => {
    const { query, push, pathname } = useRouter();
    const { t } = useTranslation();

    const handleToggle = (key: string) => () => {
        push(pathname + '?' + queryParams({ ...query, [key]: query[key] ? '' : 'true' }), undefined, { scroll: false });
    };

    return (
        <div className={css.filters}>
            <Search />

            <Group title={t('Prices')}>
                <Prices />
            </Group>

            <Group title={t('General')}>
                <Switch size="sm" label={t('Only TOP offers')} checked={Boolean(query.isTop)} onChange={handleToggle('isTop')} />
                <Switch
                    size="sm"
                    label={t('Only offers with reviews')}
                    checked={Boolean(query.isReviews)}
                    onChange={handleToggle('isReviews')}
                />
                <Switch
                    size="sm"
                    label={t('Offers with sale')}
                    checked={Boolean(query.isSale)}
                    onChange={handleToggle('isSale')}
                />
            </Group>

            <Group title={t('Category')}>
                <Categories />
            </Group>
        </div>
    );
};
