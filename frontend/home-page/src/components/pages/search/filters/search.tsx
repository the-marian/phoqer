import { ChangeEvent, FC, useMemo, useState } from 'react';

import { debounce } from 'lodash-es';
import { useRouter } from 'next/router';
import { Input, SearchIcon } from 'phoqer';

import { useTranslation } from '@app/hook/translations.hook';
import { queryParams } from '@app/utils/query-params';

export const Search: FC = () => {
    const { t } = useTranslation();
    const { query, push, pathname } = useRouter();
    const [search, setSearch] = useState(query.search ?? '');

    const startSearch = useMemo(
        () =>
            debounce((value: string) => {
                push(pathname + '?' + queryParams({ ...query, search: value }), undefined, { scroll: false });
            }, 500),
        [query],
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
        startSearch(event.target.value);
    };

    return <Input value={search} onChange={handleChange} placeholder={t('Mac Book')} leftIcon={<SearchIcon />} />;
};
