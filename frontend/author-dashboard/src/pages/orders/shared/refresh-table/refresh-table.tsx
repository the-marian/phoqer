import React, { useState } from 'react';

import classNames from 'classnames';
import { Button, SyncIcon, Text, useTableContext } from 'phoqer';
import { cacheMap } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';

import css from './refresh-table.module.scss';

interface Props {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}
export const RefreshTable = ({ currentPage, setCurrentPage }: Props): JSX.Element => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const { unselectAll } = useTableContext();

    const refreshTable = (): void => {
        setLoading(true);

        cacheMap.reset();
        setCurrentPage(currentPage);
        unselectAll();

        setTimeout(() => {
            setLoading(false);
        }, 600);
    };

    return (
        <Button primary onClick={refreshTable} disabled={loading} className={css.btn}>
            <Text as="span" className={css.text}>
                {t('Refresh table')}
            </Text>
            <SyncIcon className={classNames(loading && css.loading)} />
        </Button>
    );
};
