import React, { useEffect } from 'react';

import { useTableContext, TabList, TabItem } from 'phoqer';
import { useOffersContext, OffersStatus } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import css from './status-tabs.module.scss';

const statusList = [OffersStatus.ACTIVE, OffersStatus.DISABLED];

const statusMap = {
    [OffersStatus.ACTIVE]: 'Active',
    [OffersStatus.DISABLED]: 'Disabled',
};

export const StatusTabs = (): JSX.Element => {
    const { t } = useTranslation();
    const { state } = useLocation();
    const statusFromState = (state as Record<'status', OffersStatus>)?.status;

    const { unselectAll } = useTableContext();
    const { status, setStatus } = useOffersContext();

    const handleClick = (value?: OffersStatus): void => {
        if (value) {
            setStatus(value);
        }

        unselectAll();
    };

    useEffect(() => {
        if (statusFromState) {
            setStatus(statusFromState);
        }
    }, [setStatus, statusFromState]);

    return (
        <TabList className={css.root}>
            {statusList.map(item => (
                <TabItem key={item} active={status === item}>
                    <button type="button" onClick={() => handleClick(item)}>
                        {t(statusMap[item])}
                    </button>
                </TabItem>
            ))}
        </TabList>
    );
};
