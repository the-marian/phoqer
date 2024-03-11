import React, { useEffect } from 'react';

import { useTableContext, TabList, TabItem, OrderStatus } from 'phoqer';
import { useOrdersContext } from 'phoqer-shared';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import css from './status-tabs.module.scss';

const statusList = [OrderStatus.PENDING, OrderStatus.ACCEPTED, OrderStatus.IN_PROGRESS, OrderStatus.REJECTED, OrderStatus.DONE];

const statusMap = {
    [OrderStatus.PENDING]: 'Pending',
    [OrderStatus.ACCEPTED]: 'Accepted',
    [OrderStatus.IN_PROGRESS]: 'In progress',
    [OrderStatus.REJECTED]: 'Rejected',
    [OrderStatus.DONE]: 'Done',
};

export const StatusTabs = (): JSX.Element => {
    const { t } = useTranslation();
    const { state } = useLocation();
    const statusFromState = (state as Record<'status', OrderStatus>)?.status;

    const { unselectAll } = useTableContext();
    const { status, setStatus } = useOrdersContext();

    const handleClick = (value?: OrderStatus): void => {
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
