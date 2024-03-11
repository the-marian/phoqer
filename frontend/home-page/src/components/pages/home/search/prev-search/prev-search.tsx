import { FC, useEffect, useState } from 'react';

import { Button, CloseIcon, Heading } from 'phoqer';

import { Suggestion } from '@app/components/pages/home/search/suggestion/suggestion';
import { useTranslation } from '@app/hook/translations.hook';
import { prevSearch } from '@app/utils/search';

import css from './prev-search.module.scss';

export const PrevSearch: FC = () => {
    const { t } = useTranslation();
    const [queries, setQueries] = useState<string[]>([]);

    useEffect(() => {
        setQueries(prevSearch.get());
    }, []);

    const handleClearAll = (): void => {
        prevSearch.clearAll();
        setQueries([]);
    };

    return queries.length ? (
        <Suggestion
            list={queries}
            title={
                <>
                    <Heading as="h2" size="md">
                        {t('Your previous search')}
                    </Heading>

                    <Button className={css.ml} onClick={handleClearAll} rightIcon={<CloseIcon />}>
                        {t('Clear all')}
                    </Button>
                </>
            }
        />
    ) : (
        <></>
    );
};
